import { Brackets, SelectQueryBuilder } from 'typeorm';
import { BaseFilter } from '@nestjs-boilerplate/core';
import { Linguistic } from '../entities/linguistic.interface';

export class LanguagesFilter<E extends Linguistic> extends BaseFilter<E> {
  constructor(
    qb: SelectQueryBuilder<E>,
    private readonly languageFrom: string,
    private readonly languageTo: string,
  ) {
    super(qb);
  }

  filter(): SelectQueryBuilder<E> {
    if (!this.languageFrom || !this.languageTo) {
      return this.queryBuilder;
    }

    const languageFromIndex0 = this.getParamIndex('languageFrom');
    const languageToIndex0 = this.getParamIndex('languageTo');
    const languageToIndex1 = this.getParamIndex('languageTo');
    const languageFromIndex1 = this.getParamIndex('languageFrom');

    return this.queryBuilder.andWhere(
      new Brackets((qb) => {
        qb.where(
          new Brackets((qb) => {
            qb.where(
              `${this.queryBuilder.alias}.languageFrom = :${languageFromIndex0}`,
              {
                [languageFromIndex0]: this.languageFrom,
              },
            ).andWhere(
              `${this.queryBuilder.alias}.languageTo = :${languageToIndex0}`,
              {
                [languageToIndex0]: this.languageTo,
              },
            );
          }),
        ).orWhere(
          new Brackets((qb) => {
            qb.where(
              `${this.queryBuilder.alias}.languageFrom = :${languageToIndex1}`,
              {
                [languageToIndex1]: this.languageFrom,
              },
            ).andWhere(
              `${this.queryBuilder.alias}.languageTo = :${languageFromIndex1}`,
              {
                [languageFromIndex1]: this.languageTo,
              },
            );
          }),
        );
      }),
    );
  }
}
