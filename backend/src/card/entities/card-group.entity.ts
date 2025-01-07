import { Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import {
  Entity,
  BaseTypeormEntity,
  getTargetName,
} from '@nestjs-boilerplate/core';
import { User } from '@nestjs-boilerplate/user';
import { LanguageCodes } from '@language/language.constants';
import { Linguistic } from './linguistic.interface';
import { Card } from './card.entity';

export const NAME_MAX_LENGTH = 50;

@Entity()
export class CardGroup extends BaseTypeormEntity implements Linguistic {
  @Column({
    length: NAME_MAX_LENGTH,
  })
  name: string;

  @Column({
    enum: LanguageCodes,
  })
  languageFrom: LanguageCodes;

  @Column({
    enum: LanguageCodes,
  })
  languageTo: LanguageCodes;

  @ManyToOne(getTargetName(User), { nullable: false, eager: true })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @Column({ nullable: false })
  userId: number;

  @OneToMany(() => Card, (card) => card.group, {
    eager: false,
    persistence: false,
  })
  cards: Card[];

  // Virtual field
  learnedCards: number;

  // Virtual field
  totalCards: number;
}
