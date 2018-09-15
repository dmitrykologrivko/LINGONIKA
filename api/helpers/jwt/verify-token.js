const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Verify JWT token',

  description: 'Verify JWT token',

  inputs: {

    token: {
      type: 'string',
      required: true,
      description: 'JWT token'
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Results of verify process',
      outputDescription: 'A decoded object',
      outputType: {}
    },

    tokenExpired: {
      description: 'Token expired exception'
    },

    tokenMalformed: {
      description: 'Token malformed exception'
    },

    error: {
      outputFriendlyName: 'Exception of verify process',
      outputDescription: 'Wrapped exception',
      outputType: 'ref'
    }

  },

  fn: async function (inputs, exits) {
    const secret = sails.config.custom.jwtSecret;
    jwt.verify(inputs.token, secret, (error, decoded) => {
      if (error && error.name === 'TokenExpiredError') {
        return exits.tokenExpired();
      } else if (error && error.name === 'JsonWebTokenError') {
        return exits.tokenMalformed();
      } else if (error) {
        return exits.error(new Error(error));
      }
      return exits.success(decoded);
    });
  }

};
