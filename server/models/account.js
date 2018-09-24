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
  Account.register = _register;
  Account.me = _me;
  Account.updateMe = _updateMe;

  Account.remoteMethod('register', {
    description: 'Register a new user.',
    http: {
      path: '/register',
      verb: 'post'
    },
    accepts: [
      {arg: 'registerData', type: 'object', required: true, http: {source: 'body'}}
    ],
    returns: [
      {arg: 'access_token', type: 'object'}
    ]
  });

  Account.remoteMethod('me', {
    description: 'Get user instance for current logged user.',
    http: {
      path: '/me',
      verb: 'get'
    },
    accepts: [
      {arg: 'options', type: 'object', http: {source: 'optionsFromRequest'}}
    ],
    returns: [
      {arg: 'user', type: 'object', root: true}
    ]
  });

  Account.remoteMethod('updateMe', {
    description: 'Update user instance for current logged user.',
    http: {
      path: '/me',
      verb: 'put'
    },
    accepts: [
      {arg: 'dataToUpdate', type: 'object', required: true, http: {source: 'body'}},
      {arg: 'options', type: 'object', http: {source: 'optionsFromRequest'}}
    ]
  });
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

async function _me(options) {
  return await this.findById(options.accessToken.accountId);
}

async function _updateMe(data, options) {
  return await this.updateLastChange({
    id: options.accessToken.accountId,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    isMale: data.isMale,
    avatar: data.avatar
  });
}

function _disableRemoteMethods(Account) {
  Account.disableRemoteMethodByName('create');
  Account.disableRemoteMethodByName('replaceById');
  Account.disableRemoteMethodByName('destroyById');
  Account.disableRemoteMethodByName('prototype.patchAttributes');
  Account.disableRemoteMethodByName('find');
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
