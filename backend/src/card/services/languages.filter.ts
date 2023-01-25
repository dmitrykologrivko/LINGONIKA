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

    return this.queryBuilder.andWhere(
      new Brackets((qb) => {
        qb.where(
          new Brackets((qb) => {
            qb.where(
              `${this.queryBuilder.alias}.languageFrom = :languageFrom`,
              {
                languageFrom: this.languageFrom,
              },
            ).andWhere(`${this.queryBuilder.alias}.languageTo = :languageTo`, {
              languageTo: this.languageTo,
            });
          }),
        ).orWhere(
          new Brackets((qb) => {
            qb.where(`${this.queryBuilder.alias}.languageFrom = :languageTo`, {
              languageFrom: this.languageFrom,
            }).andWhere(
              `${this.queryBuilder.alias}.languageTo = :languageFrom`,
              {
                languageTo: this.languageTo,
              },
            );
          }),
        );
      }),
    );
  }
}
