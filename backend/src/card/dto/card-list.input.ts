import { ListInput } from '@nestjs-boilerplate/core';

export class CardListInput extends ListInput {
  languageFrom: string;

  languageTo: string;
}
