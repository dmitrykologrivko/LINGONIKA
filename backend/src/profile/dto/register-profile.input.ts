import { BaseInput } from '@nestjs-boilerplate/core';
import {
  UsernameUniqueConstraint,
  ValidatePassword,
  ValidateFirstName,
  ValidateLastName,
  ValidateEmail,
} from '@nestjs-boilerplate/user';
import { Validate } from 'class-validator';

export class RegisterProfileInput extends BaseInput {
  @ValidateEmail()
  @Validate(UsernameUniqueConstraint)
  username: string;

  @ValidatePassword()
  password: string;

  @ValidateFirstName()
  firstName: string;

  @ValidateLastName()
  lastName: string;
}
