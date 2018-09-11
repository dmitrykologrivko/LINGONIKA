const bcrypt = require('bcrypt');

module.exports = {

  friendlyName: 'Check password',

  description: 'Check hashed password helper',

  inputs: {

    password: {
      type: 'string',
      required: true,
      description: 'Plan password to check'
    },

    hash: {
      type: 'string',
      required: true,
      description: 'Hashed password'
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Results of hashing process',
      outputDescription: 'A dictionary of results',
      outputType: {
        isMatch: 'boolean'
      }
    }

  },

  fn: async function (inputs, exits) {
    const match = await bcrypt.compare(inputs.password, inputs.hash);
    return exits.success({isMatch: match});
  }

};
