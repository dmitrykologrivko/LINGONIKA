import { NonFieldValidationException } from '@nestjs-boilerplate/core';

export class ActionDeclinedException extends NonFieldValidationException {
  constructor() {
    super({
      ['actionDeclined']:
        'The requested action is declined due to incomplete or invalid input',
    });
  }
}
