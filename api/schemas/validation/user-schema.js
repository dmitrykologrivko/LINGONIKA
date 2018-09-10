module.exports = {

  register: {

    email: [
      {type: 'email', required: true},
      {
        validator(rule, value, callback, source, options) {
          User.find({email: value})
            .then(users => {
              if (users.length > 0) {
                return callback('Provided email already exists');
              } else {
                return callback();
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

  }

};
