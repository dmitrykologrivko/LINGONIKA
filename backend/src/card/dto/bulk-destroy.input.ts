import { BaseInput } from '@nestjs-boilerplate/core';
import { ArrayNotEmpty } from 'class-validator';

export class BulkDestroyInput extends BaseInput {
  @ArrayNotEmpty()
  ids: number[];
}
