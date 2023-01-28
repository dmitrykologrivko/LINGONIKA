import { BaseInput, Authorizable } from '@nestjs-boilerplate/core';
import { UserDto } from '@nestjs-boilerplate/user';

export class LearnCardsInput
  extends BaseInput
  implements Authorizable<UserDto>
{
  languages?: {
    languageFrom: string;
    languageTo: string;
  };

  groupId?: number;

  user: UserDto;
}
