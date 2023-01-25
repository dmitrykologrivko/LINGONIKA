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
  InputType,
  InputWrapper,
  ListInput,
  OrderingFilter,
  WhereFilter,
  PagePagination,
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
import { ActionDeclinedException } from '@shared/exceptions';
import { Card } from '../entities/card.entity';
import { CardGroup } from '../entities/card-group.entity';
import { CardDto } from '../dto/card.dto';
import { BulkDestroyInput } from '../dto/bulk-destroy.input';
import { CardsStatisticInput } from '../dto/cards-statistic.input';
import { CardsStatisticOutput } from '../dto/cards-statistic.output';
import { LearnCardsInput } from '../dto/learn-cards.input';
import { LanguagesFilter } from './languages.filter';
import {
  USER_GROUP_BELONG_CONSTRAINT,
  CARD_LANGUAGES_GROUP_BELONG_CONSTRAINT,
} from '../constants/card.constraints';

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
    const wrapper = { type: InputType.GENERIC_INPUT, input };

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
    const wrapper = { type: InputType.GENERIC_INPUT, input };

    return ClassValidator.validate(CardsStatisticInput, input).then(
      proceed(async () => {
        const learnedQuery = this.getQuery(null, wrapper);
        const notLearnedQuery = this.getQuery(null, wrapper);
        const totalCountQuery = this.getQuery(null, wrapper);

        new LanguagesFilter(
          learnedQuery,
          input.languageFrom,
          input.languageTo,
        ).filter();

        new LanguagesFilter(
          notLearnedQuery,
          input.languageFrom,
          input.languageTo,
        ).filter();

        new LanguagesFilter(
          totalCountQuery,
          input.languageFrom,
          input.languageTo,
        ).filter();

        const countLearned = await learnedQuery
          .andWhere(`${this.alias}.isLearned = :isLearned`, { isLearned: true })
          .getCount();

        const countNotLearned = await notLearnedQuery
          .andWhere(`${this.alias}.isLearned = :isLearned`, {
            isLearned: false,
          })
          .getCount();

        const totalCount = await totalCountQuery.getCount();

        return ok(
          ClassTransformer.toClassObject(CardsStatisticOutput, {
            countLearned,
            countNotLearned,
            totalCount,
          }),
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

    const wrapper = { type: InputType.GENERIC_INPUT, input };

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
    const validateResult = await this.validateCard(input, queryRunner);
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
    const validateResult = await this.validateCard(input, queryRunner);
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
        user: wrapper.input.extra?.user?.id,
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
      userId: input.extra?.user?.id,
    };
  }

  private async validateCard(
    input: CreateInput<CardDto> | UpdateInput<CardDto>,
    queryRunner: QueryRunner,
  ): Promise<Result<any, ValidationException>> {
    if (input.payload.groupId) {
      const group = await queryRunner.manager.findOne(CardGroup, {
        where: {
          id: Equal(input.payload.groupId),
          user: {
            id: Equal(input.extra?.user?.id),
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

      if (
        !(
          (input.payload.languageFrom === group.languageFrom &&
            input.payload.languageTo === group.languageTo) ||
          (input.payload.languageFrom === group.languageTo &&
            input.payload.languageTo === group.languageFrom)
        )
      ) {
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
