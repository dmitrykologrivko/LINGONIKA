import { IsEnum, IsOptional } from 'class-validator';
import { BaseInput, Authorizable } from '@nestjs-boilerplate/core';
import { UserDto } from '@nestjs-boilerplate/user';
import { LanguageCodes } from '@app/language/';

export class CardsStatisticInput
  extends BaseInput
  implements Authorizable<UserDto>
{
  @IsOptional()
  @IsEnum(LanguageCodes)
  languageFrom?: string;

  @IsOptional()
  @IsEnum(LanguageCodes)
  languageTo?: string;

  user: UserDto;
}
