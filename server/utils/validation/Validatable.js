/**
 * Custom ValidationError similar with loopback jagger ValidationError
 */
class ValidationError extends Error {
  constructor() {
    super();
    this.name = 'ValidationError';
    this.message = 'Validation errors';
    this.statusCode = 422;
    this.details = {};
    this.details.codes = {};
    this.details.messages = {};
  }

  putField(field, code, message) {
    if (!(field || code || message)) throw new Error('Field, Code and Message are required args.');

    if (!this.details.codes.hasOwnProperty(field)) {
      this.details.codes[field] = [];
    }
    if (!this.details.messages.hasOwnProperty(field)) {
      this.details.messages[field] = [];
    }

    this.details.codes[field].push(code);
    this.details.messages[field].push(message);
  }

  containsFields() {
    return Object.keys(this.details.codes).length !== 0
      && Object.keys(this.details.messages).length !== 0;
  }
}

/**
 * Custom implementation Validatable class similar with loopback jagger Validatable
 */
class Validatable {
  constructor() {
    this._validators = [];
  }

  addValidator(fn) {
    if (typeof fn !== 'function') throw new Error('fn must be a function');
    this._validators.push(fn);
    return this;
  }

  async validate() {
    const error = new ValidationError();

    for (let validator of this._validators) {
      const {field, code, message} = await validator();
      if (field && code && message) {
        error.putField(field, code, message);
      }
    }

    if (error.containsFields()) throw error;
  }
}

module.exports = Validatable;
