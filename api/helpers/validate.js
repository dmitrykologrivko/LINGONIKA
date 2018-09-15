const Schema = require('async-validator');

function extendOptions(options) {
  const extOptions = options || {};
  if (!extOptions.hasOwnProperty('firstFields')) extOptions.firstFields = true;
  return extOptions;
}

module.exports = {

  friendlyName: 'Validate',

  description: 'Validate something.',

  inputs: {

    data: {
      type: 'ref',
      required: true,
      description: 'Data which should be validated'
    },

    descriptor: {
      type: 'ref',
      required: true,
      description: 'Descriptor of validation schema'
    },

    options: {
      type: 'ref',
      description: 'Validation options'
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
    const validator = new Schema(inputs.descriptor);
    const options = extendOptions(inputs.options);
    validator.validate(inputs.data, options, (errors, fields) => {
      // When validation is failed a library returns next arguments:
      // "errors" is an array of all errors
      // "fields" is an object keyed by field name with an array of errors per field
      return exits.success({isValid: !errors, fields: fields});
    });
  }

};
