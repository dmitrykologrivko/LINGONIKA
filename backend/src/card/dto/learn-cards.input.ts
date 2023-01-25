import { BaseInput } from '@nestjs-boilerplate/core';

export class LearnCardsInput extends BaseInput {
  languages?: {
    languageFrom: string;
    languageTo: string;
  };

  groupId?: number;
}
