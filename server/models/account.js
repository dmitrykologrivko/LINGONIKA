'use strict';

const validators = require('../utils/validation/validators');

module.exports = function (Account) {
  _applyValidationRules(Account);
  _applyRemoteMethods(Account);
  _disableRemoteMethods(Account);
};

/* Model Validation */

function _applyValidationRules(Account) {
  Account.validate('avatar', _validateAvatar, {message: 'Incorrect URL'});
}

function _validateAvatar(err) {
  if (this.avatar && !validators.isUrl(this.avatar)) {
    return err();
  }
}

/* End Model Validation */

/* Model Remote methods */

function _applyRemoteMethods(Account) {
  Account.prototype.register = _register;

  Account.remoteMethod('register', {
    description: 'Register a new user.',
    http: {
      path: '/register',
      verb: 'post'
    },
    accepts: [
      {arg: 'registerData', type: 'object', required: true, http: {source: 'body'}},
      // {arg: 'password', type: 'string', required: true},
      // {arg: 'firstName', type: 'string', required: true},
      // {arg: 'lastName', type: 'string', required: true},
      // {arg: 'dateOfBirth', type: 'date', required: true},
      // {arg: 'isMale', type: 'boolean'},
      // {arg: 'avatar', type: 'string'},
      // {arg: 'res', type: 'object', http:{source: 'res'}},
    ],
    returns: [
      {arg: 'access_token', type: 'object'},
    ]
  });

  // Account.beforeRemote("register", async function (ctx) {
  //   const data = ctx.args.registerData;
  //
  //   const error = new ValidationError();
  //
  //   if (!data.email) {
  //     error.putField('email', 'required', 'email is required');
  //   }
  //
  //   if (!data.password) {
  //     error.putField('password', 'required', 'password is required');
  //     error.putField('password', 'min', 'password is to short');
  //   }
  //
  //   if (error.containsFields()) {
  //     return Promise.reject(error);
  //   }
  //
  //   return Promise.resolve();
  //
  //   // put your custom validation here
  //   // if(!ctx.args.number){
  //   //   const err = new Error('df');
  //   //   err.statusCode = 422;
  //   //   return Promise.reject(err);
  //   // }
  //   // next();
  // });
}

async function _register(data) {
  const user = await this.create({
    email: data.email,
    username: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    isMale: data.isMale,
    avatar: data.avatar,
    emailVerified: true
  });
  return await user.createAccessToken();
}

function _disableRemoteMethods(Account) {
  Account.disableRemoteMethodByName('create');
  Account.disableRemoteMethodByName('replaceById');
  Account.disableRemoteMethodByName('destroyById');
  Account.disableRemoteMethodByName('prototype.patchAttributes');
  // Account.disableRemoteMethodByName('find');
  Account.disableRemoteMethodByName('findById');
  Account.disableRemoteMethodByName('exists');
  Account.disableRemoteMethodByName('count');
  Account.disableRemoteMethodByName('replace');
  Account.disableRemoteMethodByName('createChangeStream');
  Account.disableRemoteMethodByName('replaceById');
  Account.disableRemoteMethodByName('replaceOrCreate');
  Account.disableRemoteMethodByName('patchOrCreate');
  Account.disableRemoteMethodByName('findOne');
  Account.disableRemoteMethodByName('updateAll');
  Account.disableRemoteMethodByName('upsertWithWhere');
  Account.disableRemoteMethodByName('prototype.verify');
  Account.disableRemoteMethodByName('confirm');
  Account.disableRemoteMethodByName('prototype.__get__accessTokens');
  Account.disableRemoteMethodByName('prototype.__create__accessTokens');
  Account.disableRemoteMethodByName('prototype.__delete__accessTokens');
  Account.disableRemoteMethodByName('prototype.__findById__accessTokens');
  Account.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  Account.disableRemoteMethodByName('prototype.__updateById__accessTokens');
  Account.disableRemoteMethodByName('prototype.__count__accessTokens');
}

/* End Model Remote Methods */
