import { Column, JoinColumn, ManyToOne } from 'typeorm';
import {
  Entity,
  BaseTypeormEntity,
  getTargetName,
} from '@nestjs-boilerplate/core';
import { User } from '@nestjs-boilerplate/user';
import { LanguageCodes } from '@languages/language.constants';

export const NAME_MAX_LENGTH = 50;

@Entity()
export class Group extends BaseTypeormEntity {
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
  @JoinColumn()
  user: User;
}
