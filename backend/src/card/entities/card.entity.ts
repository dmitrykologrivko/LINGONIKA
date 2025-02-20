import { Column, ManyToOne, JoinColumn } from 'typeorm';
import {
  Entity,
  BaseTypeormEntity,
  getTargetName,
} from '@nestjs-boilerplate/core';
import { User } from '@nestjs-boilerplate/user';
import { LanguageCodes } from '@language/language.constants';
import { CardGroup } from './card-group.entity';
import { Linguistic } from './linguistic.interface';

export const TEXT_FROM_MAX_LENGTH = 250;
export const TEXT_TO_MAX_LENGTH = 250;
export const EXAMPLE_MAX_LENGTH = 3000;

@Entity()
export class Card extends BaseTypeormEntity implements Linguistic {
  @Column({
    length: TEXT_FROM_MAX_LENGTH,
  })
  textFrom: string;

  @Column({
    length: TEXT_TO_MAX_LENGTH,
  })
  textTo: string;

  @Column({
    enum: LanguageCodes,
  })
  languageFrom: LanguageCodes;

  @Column({
    enum: LanguageCodes,
  })
  languageTo: LanguageCodes;

  @Column({
    length: EXAMPLE_MAX_LENGTH,
    nullable: true,
  })
  example: string;

  @Column({ default: false })
  isLearned: boolean;

  @ManyToOne((type) => CardGroup, {
    nullable: true,
    persistence: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'groupId',
  })
  group: CardGroup;

  @Column({ nullable: true })
  groupId: number;

  @ManyToOne(getTargetName(User), {
    nullable: false,
    persistence: false,
    eager: true,
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @Column({ nullable: false })
  userId: number;
}
