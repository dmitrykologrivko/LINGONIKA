import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';
import {
  ApplicationService,
  BaseCrudService,
  CreateInput,
  InputWrapper,
  ListInput,
  OrderingFilter,
  PagePagination,
} from '@nestjs-boilerplate/core';
import { CardGroup } from '../entities/card-group.entity';
import { CardGroupDto } from '../dto/card-group.dto';
import { LanguagesFilter } from './languages.filter';

@ApplicationService()
export class CardGroupService extends BaseCrudService<CardGroup, CardGroupDto> {
  constructor(protected dataSource: DataSource) {
    super(dataSource, {
      entityCls: CardGroup,
      listOutputCls: CardGroupDto,
      retrieveOutputCls: CardGroupDto,
      createPayloadCls: CardGroupDto,
      createOutputCls: CardGroupDto,
      updatePayloadCls: CardGroupDto,
      updateOutputCls: CardGroupDto,
    });
  }

  protected getPagination(input: ListInput, qb: SelectQueryBuilder<CardGroup>) {
    return new PagePagination<CardGroup>(qb, input);
  }

  protected getFilters(input: ListInput, qb: SelectQueryBuilder<CardGroup>) {
    return [
      new OrderingFilter(qb, input, {
        orderingFields: ['id', 'name'],
        defaultOrdering: ['-id'],
      }),
      new LanguagesFilter(qb, input.query.languageFrom, input.query.languageTo),
    ];
  }

  protected getQuery(
    queryRunner?: QueryRunner,
    wrapper?: InputWrapper,
  ): SelectQueryBuilder<CardGroup> {
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
    input: CreateInput<CardGroupDto>,
    queryRunner: QueryRunner,
  ): Promise<CardGroup> {
    return {
      ...(await super.mapCreateInput(input, queryRunner)),
      userId: input.extra?.user?.id,
    };
  }
}
