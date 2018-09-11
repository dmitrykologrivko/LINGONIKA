const bcrypt = require('bcrypt');

const SAILT_ROUNDS = 10;

module.exports = {

  friendlyName: 'Hash password',

  description: 'Hash password helper',

  inputs: {

    password: {
      type: 'string',
      required: true,
      description: 'Plan password to hash'
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Results of hashing process',
      outputDescription: 'A dictionary of results',
      outputType: {
        hash: 'string'
      }
    }

  },

  fn: async function (inputs, exits) {
    const hash = await bcrypt.hash(inputs.password, SAILT_ROUNDS);
    return exits.success({hash: hash});
  }

};
