import { IsNotEmpty, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  PartialUpdate,
  ReadOnly,
  WriteOnly,
  BaseTimeStampedEntityDto,
} from '@nestjs-boilerplate/core';
import { LanguageCodes } from '@languages/language.constants';
import {
  TEXT_TO_MAX_LENGTH,
  EXAMPLE_MAX_LENGTH,
  TEXT_FROM_MAX_LENGTH,
} from '../entities/card.entity';
import { CardGroupShortDto } from './card-group-short.dto';

@Exclude()
export class CardDto extends BaseTimeStampedEntityDto {
  @PartialUpdate()
  @IsNotEmpty({ always: true })
  @MaxLength(TEXT_FROM_MAX_LENGTH, { always: true })
  @Expose()
  textFrom: string;

  @PartialUpdate()
  @IsNotEmpty({ always: true })
  @MaxLength(TEXT_TO_MAX_LENGTH, { always: true })
  @Expose()
  textTo: string;

  @PartialUpdate()
  @IsNotEmpty({ always: true })
  @IsEnum(LanguageCodes, { always: true })
  @Expose()
  languageFrom: LanguageCodes;

  @PartialUpdate()
  @IsNotEmpty({ always: true })
  @IsEnum(LanguageCodes, { always: true })
  @Expose()
  languageTo: LanguageCodes;

  @PartialUpdate()
  @IsOptional({ always: true })
  @MaxLength(EXAMPLE_MAX_LENGTH, { always: true })
  @Expose()
  example: string;

  @PartialUpdate()
  @Expose()
  isLearned: boolean;

  @Type(() => CardGroupShortDto)
  @ReadOnly()
  group: CardGroupShortDto;

  @IsOptional({ always: true })
  @WriteOnly()
  groupId: number;
}
