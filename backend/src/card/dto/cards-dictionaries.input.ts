import { BaseInput, Authorizable } from '@nestjs-boilerplate/core';

export class CardsDictionaryInput extends BaseInput implements Authorizable {
  user: any;
}
