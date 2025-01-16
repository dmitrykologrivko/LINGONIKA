import { BaseInput, PartialUpdate } from '@nestjs-boilerplate/core';
import { ValidateFirstName, ValidateLastName } from '@nestjs-boilerplate/user';
import { IsDefined } from 'class-validator';

export class UpdateProfileInput extends BaseInput {
  @ValidateFirstName()
  @PartialUpdate()
  firstName: string;

  @ValidateLastName()
  @PartialUpdate()
  lastName: string;

  @IsDefined()
  userId: number;
}
