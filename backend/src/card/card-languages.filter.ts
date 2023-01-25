import { Brackets, SelectQueryBuilder } from 'typeorm';
import { BaseFilter } from '@nestjs-boilerplate/core';
import { Card } from './entities/card.entity';

export class CardLanguagesFilter extends BaseFilter<Card> {
  constructor(
    qb: SelectQueryBuilder<Card>,
    private readonly languageFrom: string,
    private readonly languageTo: string,
  ) {
    super(qb);
  }

  filter(): SelectQueryBuilder<Card> {
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
