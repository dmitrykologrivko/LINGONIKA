import { BaseInput } from '@nestjs-boilerplate/core';
import { IsDefined } from 'class-validator';

export class GetProfileInput extends BaseInput {
  @IsDefined()
  userId: number;
}
