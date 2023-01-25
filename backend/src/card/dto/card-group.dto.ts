import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import {
  BaseTimeStampedEntityDto,
  CrudOperations,
  PartialUpdate,
  ReadOnly,
} from '@nestjs-boilerplate/core';
import { LanguageCodes } from '@languages/language.constants';
import { NAME_MAX_LENGTH } from '../entities/card-group.entity';

const READ_CREATE_OPERATIONS = [CrudOperations.READ, CrudOperations.CREATE];

@Exclude()
export class CardGroupDto extends BaseTimeStampedEntityDto {
  @PartialUpdate()
  @IsNotEmpty({ always: true })
  @MaxLength(NAME_MAX_LENGTH, { always: true })
  @Expose()
  name: string;

  @IsNotEmpty({ groups: READ_CREATE_OPERATIONS })
  @IsEnum(LanguageCodes, { groups: READ_CREATE_OPERATIONS })
  @Expose({ groups: READ_CREATE_OPERATIONS })
  languageFrom: LanguageCodes;

  @IsNotEmpty({ groups: READ_CREATE_OPERATIONS })
  @IsEnum(LanguageCodes, { groups: READ_CREATE_OPERATIONS })
  @Expose({ groups: READ_CREATE_OPERATIONS })
  languageTo: LanguageCodes;

  @ReadOnly()
  learnedCards: number;

  @ReadOnly()
  totalCards: number;
}
