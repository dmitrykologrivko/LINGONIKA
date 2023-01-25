import { DataSource, In, QueryRunner, SelectQueryBuilder } from 'typeorm';
import {
  ApplicationService,
  BaseCrudService,
  ClassValidator,
  ClassTransformer,
  CreateInput,
  InputType,
  InputWrapper,
  ListInput,
  OrderingFilter,
  PagePagination,
  transaction,
  WhereFilter,
  Result,
  ok,
  err,
  proceed,
  ValidationContainerException,
  TransactionRollbackException,
  CrudOperations,
} from '@nestjs-boilerplate/core';
import { ActionDeclinedException } from '@shared/exceptions';
import { Card } from './entities/card.entity';
import { CardDto } from './dto/card.dto';
import { BulkDestroyInput } from './dto/bulk-destroy.input';
import { CardsStatisticInput } from './dto/cards-statistic.input';
import { CardsStatisticOutput } from './dto/cards-statistic.output';
import { LearnCardsInput } from './dto/learn-cards.input';
import { CardLanguagesFilter } from './card-languages.filter';

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

        new CardLanguagesFilter(
          learnedQuery,
          input.languageFrom,
          input.languageTo,
        ).filter();

        new CardLanguagesFilter(
          notLearnedQuery,
          input.languageFrom,
          input.languageTo,
        ).filter();

        new CardLanguagesFilter(
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
    const wrapper = { type: InputType.GENERIC_INPUT, input };

    return ClassValidator.validate(LearnCardsInput, input).then(
      proceed(async () => {
        const query = this.getQuery(null, wrapper).andWhere(
          `${this.alias}.isLearned = :isLearned`,
          { isLearned: false },
        );

        new CardLanguagesFilter(
          query,
          input.languageFrom,
          input.languageTo,
        ).filter();

        return ok(
          ClassTransformer.toClassObjects(CardDto, await query.getMany(), {
            groups: [CrudOperations.READ],
          }),
        );
      }),
    );
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
        filterFields: ['isLearned'],
      }),
      new CardLanguagesFilter(
        qb,
        input.query.languageFrom,
        input.query.languageTo,
      ),
    ];
  }

  protected getQuery(
    queryRunner?: QueryRunner,
    wrapper?: InputWrapper,
  ): SelectQueryBuilder<Card> {
    const query = super
      .getQuery(queryRunner, wrapper)
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
}
