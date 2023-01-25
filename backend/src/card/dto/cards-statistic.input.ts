import { IsEnum, IsOptional } from 'class-validator';
import { BaseInput } from '@nestjs-boilerplate/core';
import { LanguageCodes } from '@app/language/';

export class CardsStatisticInput extends BaseInput {
  @IsOptional()
  @IsEnum(LanguageCodes)
  languageFrom?: string;

  @IsOptional()
  @IsEnum(LanguageCodes)
  languageTo?: string;
}
