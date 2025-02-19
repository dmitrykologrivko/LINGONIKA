import {
  DataSource,
  QueryRunner,
  SelectQueryBuilder,
  In,
  Equal,
} from 'typeorm';
import {
  ApplicationService,
  BaseCrudService,
  ClassValidator,
  ClassTransformer,
  CreateInput,
  UpdateInput,
  InputWrapper,
  ListInput,
  OrderingFilter,
  WhereFilter,
  PagePagination,
  Authorizable,
  transaction,
  Result,
  ok,
  err,
  proceed,
  ValidationContainerException,
  ValidationException,
  TransactionRollbackException,
  CrudOperations,
} from '@nestjs-boilerplate/core';
import { UserDto } from '@nestjs-boilerplate/user';
import { ActionDeclinedException } from '@shared/exceptions';
import { Card } from '../entities/card.entity';
import { CardGroup } from '../entities/card-group.entity';
import { CardDto } from '../dto/card.dto';
import { BulkDestroyInput } from '../dto/bulk-destroy.input';
import { CardsStatisticInput } from '../dto/cards-statistic.input';
import { CardsStatisticOutput } from '../dto/cards-statistic.output';
import { CardsDictionaryInput } from '../dto/cards-dictionaries.input';
import { CardsDictionariesOutput } from '../dto/cards-dictionaries.output';
import { LearnCardsInput } from '../dto/learn-cards.input';
import { LanguagesFilter } from './languages.filter';
import {
  USER_GROUP_BELONG_CONSTRAINT,
  CARD_LANGUAGES_GROUP_BELONG_CONSTRAINT,
} from '../constants/card.constraints';

const BULK_DESTROY_INPUT = 'bulk_destroy_input';
const CARDS_STATISTIC_INPUT = 'cards_statistic_input';
const CARDS_DICTIONARIES_INPUT = 'cards_dictionaries_input';
const LEARN_CARDS_INPUT = 'learn_cards_input';

@ApplicationService()
export class CardService extends BaseCrudService<Card, CardDto> {
  constructor(protected dataSource: DataSource) {
    super(dataSource, {
      entityCls: Card,
      listOutputCls: CardDto,
      retrieveOutputCls: CardDto,
      createPayloadCls: CardDto,
      createOutputCls: CardDto,
      updatePayloadCls: CardDto,
      updateOutputCls: CardDto,
    });
  }

  async bulkDestroy(
    input: BulkDestroyInput,
  ): Promise<
    Result<
      void,
      | ValidationContainerException
      | ActionDeclinedException
      | TransactionRollbackException
    >
  > {
    const wrapper = { type: BULK_DESTROY_INPUT, input };

    const handler = (queryRunner: QueryRunner) =>
      ClassValidator.validate(BulkDestroyInput, input).then(
        proceed(async () => {
          const count = await this.getQuery(queryRunner, wrapper)
            .andWhereInIds(input.ids)
            .getCount();

          if (input.ids.length === count) {
            await queryRunner.manager.delete(Card, { id: In(input.ids) });
            return ok<void>(null);
          } else {
            return err(new ActionDeclinedException());
          }
        }),
      );

    return transaction(this.dataSource, handler);
  }

  async cardsStatistic(
    input: CardsStatisticInput,
  ): Promise<Result<CardsStatisticOutput, ValidationContainerException>> {
    const wrapper = { type: CARDS_STATISTIC_INPUT, input };

    return ClassValidator.validate(CardsStatisticInput, input).then(
      proceed(async () => {
        const query = this.getSimpleQuery(null, wrapper)
          .addSelect(`COUNT(${this.alias}.id)::INTEGER`, 'totalCount')
          .addSelect(
            `COUNT(CASE WHEN ${this.alias}.isLearned = TRUE THEN FALSE END)::INTEGER`,
            'countLearned',
          )
          .addSelect(
            `COUNT(CASE WHEN ${this.alias}.isLearned = FALSE THEN TRUE END)::INTEGER`,
            'countNotLearned',
          );

        const rawResult = await new LanguagesFilter(
          query,
          input.languageFrom,
          input.languageTo,
        )
          .filter()
          .getRawOne();

        return ok(
          ClassTransformer.toClassObject(CardsStatisticOutput, {
            countLearned: rawResult?.countLearned || 0,
            countNotLearned: rawResult?.countNotLearned || 0,
            totalCount: rawResult?.totalCount || 0,
          }),
        );
      }),
    );
  }

  async cardsDictionaries(
    input: CardsDictionaryInput,
  ): Promise<Result<CardsDictionariesOutput[], ValidationContainerException>> {
    const wrapper = { type: CARDS_DICTIONARIES_INPUT, input };

    return ClassValidator.validate(CardsDictionaryInput, input).then(
      proceed(async () => {
        const query = this.getSimpleQuery(null, wrapper)
          .addSelect(`${this.alias}.languageFrom`, 'languageFrom')
          .addSelect(`${this.alias}.languageTo`, 'languageTo')
          .addSelect(`COUNT(${this.alias}.id)::INTEGER`, 'totalCount')
          .addSelect(
            `COUNT(CASE WHEN ${this.alias}.isLearned = TRUE THEN FALSE END)::INTEGER`,
            'countLearned',
          )
          .addGroupBy(`${this.alias}.languageFrom`)
          .addGroupBy(`${this.alias}.languageTo`)
          .addOrderBy('"totalCount"', 'DESC');

        const rawResult = await query.getRawMany();

        return ok(
          ClassTransformer.toClassObjects(
            CardsDictionariesOutput,
            rawResult.map((item) => ({
              languageFrom: item.languageFrom,
              languageTo: item.languageTo,
              countLearned: item.countLearned,
              totalCount: item.totalCount,
            })),
          ),
        );
      }),
    );
  }

  async learnCards(
    input: LearnCardsInput,
  ): Promise<Result<CardDto[], ValidationContainerException>> {
    if (!input.languages && !input.groupId) {
      return ok([]);
    }

    const wrapper = { type: LEARN_CARDS_INPUT, input };

    const query = this.getQuery(null, wrapper).andWhere(
      `${this.alias}.isLearned = :isLearned`,
      { isLearned: false },
    );

    if (input.languages) {
      new LanguagesFilter(
        query,
        input.languages.languageFrom,
        input.languages.languageTo,
      ).filter();
    } else {
      query.andWhere(`${this.alias}.groupId = :groupId`, {
        groupId: input.groupId,
      });
    }

    return ok(
      ClassTransformer.toClassObjects(CardDto, await query.getMany(), {
        groups: [CrudOperations.READ],
      }),
    );
  }

  protected async performCreateEntity(
    input: CreateInput<CardDto>,
    queryRunner: QueryRunner,
  ): Promise<Result<Card, ValidationException>> {
    const validateResult = await this.validateCard(input, null, queryRunner);
    if (validateResult.isErr()) {
      return validateResult;
    }

    return super.performCreateEntity(input, queryRunner);
  }

  protected async performUpdateEntity(
    input: UpdateInput<CardDto>,
    entity: Card,
    queryRunner: QueryRunner,
  ): Promise<Result<Card, any>> {
    const validateResult = await this.validateCard(input, entity, queryRunner);
    if (validateResult.isErr()) {
      return validateResult;
    }

    return super.performUpdateEntity(input, entity, queryRunner);
  }

  protected getPagination(input: ListInput, qb: SelectQueryBuilder<Card>) {
    return new PagePagination<Card>(qb, input);
  }

  protected getFilters(input: ListInput, qb: SelectQueryBuilder<Card>) {
    return [
      new OrderingFilter(qb, input, {
        orderingFields: ['id', 'textFrom'],
        defaultOrdering: ['-id'],
      }),
      new WhereFilter(qb, input, {
        filterFields: ['isLearned', 'group'],
      }),
      new LanguagesFilter(qb, input.query.languageFrom, input.query.languageTo),
    ];
  }

  protected getQuery(
    queryRunner?: QueryRunner,
    wrapper?: InputWrapper,
  ): SelectQueryBuilder<Card> {
    const query = super
      .getQuery(queryRunner, wrapper)
      .leftJoinAndSelect(`${this.alias}.group`, 'group')
      .leftJoinAndSelect(`${this.alias}.user`, 'user');

    if (wrapper) {
      query.andWhere('user.id = :user', {
        user: (wrapper.input as Authorizable<UserDto>).user.id,
      });
    }

    return query;
  }

  protected getSimpleQuery(
    queryRunner?: QueryRunner,
    wrapper?: InputWrapper,
  ): SelectQueryBuilder<Card> {
    const query = super
      .getQuery(queryRunner, wrapper)
      .select([])
      .leftJoin(`${this.alias}.group`, 'group')
      .leftJoin(`${this.alias}.user`, 'user');

    if (wrapper) {
      query.andWhere('user.id = :user', {
        user: (wrapper.input as Authorizable<UserDto>).user.id,
      });
    }

    return query;
  }

  protected async mapCreateInput(
    input: CreateInput<CardDto>,
    queryRunner: QueryRunner,
  ): Promise<Card> {
    return {
      ...(await super.mapCreateInput(input, queryRunner)),
      userId: input.user.id,
    };
  }

  private async validateCard(
    input: CreateInput<CardDto> | UpdateInput<CardDto>,
    entity: Card,
    queryRunner: QueryRunner,
  ): Promise<Result<any, ValidationException>> {
    if (input.payload.groupId) {
      const group = await queryRunner.manager.findOne(CardGroup, {
        where: {
          id: Equal(input.payload.groupId),
          user: {
            id: Equal(input.user.id),
          },
        },
      });

      if (!group) {
        return err(
          new ValidationException(
            'groupId',
            input.payload.groupId,
            USER_GROUP_BELONG_CONSTRAINT,
          ),
        );
      }

      const notBelongToGroup = entity
        ? !(
            (entity.languageFrom === group.languageFrom &&
              entity.languageTo === group.languageTo) ||
            (entity.languageFrom === group.languageTo &&
              entity.languageTo === group.languageFrom)
          )
        : !(
            (input.payload.languageFrom === group.languageFrom &&
              input.payload.languageTo === group.languageTo) ||
            (input.payload.languageFrom === group.languageTo &&
              input.payload.languageTo === group.languageFrom)
          );

      if (notBelongToGroup) {
        return err(
          new ValidationException(
            'groupId',
            input.payload.groupId,
            CARD_LANGUAGES_GROUP_BELONG_CONSTRAINT,
          ),
        );
      }
    }

    return ok(null);
  }
}
