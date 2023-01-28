import { BaseInput, Authorizable } from '@nestjs-boilerplate/core';
import { UserDto } from '@nestjs-boilerplate/user';
import { ArrayNotEmpty } from 'class-validator';

export class BulkDestroyInput
  extends BaseInput
  implements Authorizable<UserDto>
{
  @ArrayNotEmpty()
  ids: number[];
  user: UserDto;
}
