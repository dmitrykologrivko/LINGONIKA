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
    return exits.success({hash: 'SOME_HASH_STRING'});
  }

};

