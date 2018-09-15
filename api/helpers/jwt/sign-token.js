const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Sign JWT token',

  description: 'Sign JWT token',

  inputs: {

    user: {
      type: {},
      required: true,
      description: 'User model instance'
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Result of sign process',
      outputDescription: 'JWT token',
      outputType: 'string'
    },

    error: {
      outputFriendlyName: 'Exception of sign process',
      outputDescription: 'Wrapped exception',
      outputType: 'ref'
    }

  },

  fn: async function (inputs, exits) {
    const data = {id: inputs.user.id};
    const secret = sails.config.custom.jwtSecret;
    const options = {expiresIn: sails.config.custom.jwtExpiresIn};
    jwt.sign(data, secret, options, (error, token) => {
      if (error) {
        return exits.error(new Error(error));
      }
      return exits.success(token);
    });
  }

};
