import { FieldError } from 'react-hook-form';

export class ValidationError extends Error {
  public fieldErrors: Record<string, FieldError>;

  constructor() {
    super();
    this.fieldErrors = {};
  }
}
