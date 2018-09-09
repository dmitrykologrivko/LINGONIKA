const Schema = require('async-validator');

module.exports = {

  friendlyName: 'Validate',

  description: 'Validate something.',

  inputs: {

    data: {
      type: 'ref',
      required: true,
      description: 'Data which should be validated',
    },

    schema: {
      type: 'ref',
      required: true,
      description: 'Descriptor of validation schema'
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Results of validation process',
      outputDescription: 'A dictionary of validation results',
      outputType: {
        isValid: 'boolean',
        fields: 'ref'
      }
    }

  },

  fn: async function (inputs, exits) {
    const validator = new Schema(inputs.schema);
    validator.validate(inputs.data, (errors, fields) => {
      // When validation is failed a library returns next arguments:
      // "errors" is an array of all errors
      // "fields" is an object keyed by field name with an array of errors per field
      return exits.success({isValid: !!errors, fields: fields});
    });
  }

};

