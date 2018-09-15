const ValidationError = require('../../exceptions/ValidationError');

module.exports = {

  /**
   * Login user schema
   */
  login: {

    username: [
      {type: 'email', required: true},
      {
        validator(rule, value, callback, source, options) {
          User.findOne({email: value || ''})
            .then(user => {
              if (!user) {
                throw new ValidationError('Provided user is not found');
              } else {
                return callback();
              }
            })
            .catch(error => {
              if (error instanceof ValidationError) {
                return callback(error.message);
              } else {
                sails.log.error(error);
                return callback('Internal validation error');
              }
            });
        }
      }
    ],

    password: [
      {type: 'string', required: true},
      {
        validator(rule, value, callback, source, options) {
          User.findOne({email: source.username || ''})
            .then(user => {
              if (!user) throw new ValidationError('Сould not verify the password because the user was not found');
              return sails.helpers.password.checkPassword(value, user.hashedPassword);
            })
            .then(match => {
              if (!match) throw new ValidationError('Provided password does not match with current password');
              return callback();
            })
            .catch(error => {
              if (error instanceof ValidationError) {
                return callback(error.message);
              } else {
                sails.log.error(error);
                return callback('Internal validation error');
              }
            });
        }
      }
    ]

  },

  /**
   * Register user schema
   */
  register: {

    email: [
      {type: 'email', required: true},
      {
        validator(rule, value, callback, source, options) {
          User.findOne({email: value || ''})
            .then(user => {
              if (user) throw new ValidationError('Provided email already exists');
              return callback();
            })
            .catch(error => {
              if (error instanceof ValidationError) {
                return callback(error.message);
              } else {
                sails.log.error(error);
                return callback('Internal validation error');
              }
            });
        }
      }
    ],

    password: {
      type: 'string',
      required: true,
      min: 8,
      max: 50
    },

    firstName: {
      type: 'string',
      required: true,
      max: 100
    },

    lastName: {
      type: 'string',
      required: true
    },

    dateOfBirth: {
      type: 'date',
      required: true
    },

    isMale: {
      type: 'boolean',
      required: true
    },

    avatar: {
      type: 'url'
    }

  },

  /**
   * Update user schema
   */
  update: {

    email: [
      {type: 'email', required: true},
      {
        validator(rule, value, callback, source, options) {
          User.findOne({id: {'!=': options.arguments.userId}, email: value || ''})
            .then(user => {
              if (user) throw new ValidationError('Provided email already exists');
              return callback();
            })
            .catch(error => {
              if (error instanceof ValidationError) {
                return callback(error.message);
              } else {
                sails.log.error(error);
                return callback('Internal validation error');
              }
            });
        }
      }
    ],

    firstName: {
      type: 'string',
      required: true,
      max: 100
    },

    lastName: {
      type: 'string',
      required: true
    },

    dateOfBirth: {
      type: 'date',
      required: true
    },

    isMale: {
      type: 'boolean',
      required: true
    },

    avatar: {
      type: 'url'
    }

  },

  /**
   * Reset user`s password schema
   */
  resetPassword: {

    email: {
      type: 'email',
      required: true
    }

  }

};
