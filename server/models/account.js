'use strict';

const validators = require('../utils/validation/validators');

/**
 * Account model
 */
module.exports = function (Account) {
  _applyValidationRules(Account);
  _applyRemoteMethods(Account);
};

// |\/| _  _| _ |     _ |. _| _ _|_. _  _
// |  |(_)(_|(/_|  \/(_|||(_|(_| | |(_)| |

/**
 * Apply validation rules to account model
 * @private
 */
function _applyValidationRules(Account) {
  Account.validate('avatar', _validateAvatar, {message: 'Incorrect URL'});
}

/**
 * Validate that avatar field is valid URL
 * @param err callback
 * @private
 */
function _validateAvatar(err) {
  if (this.avatar && !validators.isUrl(this.avatar)) {
    return err();
  }
}

// |~) _  _ _  _ _|_ _    _ _  _ _|_|_  _  _| _
// |~\(/_| | |(_) | (/_  | | |(/_ | | |(_)(_|_\

/**
 * Apply remote methods to account model
 * @private
 */
function _applyRemoteMethods(Account) {
  Account.register = _register;
  Account.getMe = _getMe;
  Account.updateMe = _updateMe;
}

/**
 * Register a new user custom method
 * @param {object} data Registration data: email, password, firstName, lastName, dateOfBirth, isMale, avatar.
 * @returns {Promise<object>} Access Token object.
 * @private
 */
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

/**
 * Get user instance for current logged user.
 * @param {object} options Loopback options
 * @returns {Promise<object>} Current user instance.
 * @private
 */
async function _getMe(options) {
  return await this.findById(options.accessToken.userId);
}

/**
 * Update user instance for current logged user.
 * @param data Data to update: email, firstName, lastName, dateOfBirth, isMale, avatar
 * @param options Loopback options
 * @returns {Promise<object>} Updated user instance.
 * @private
 */
async function _updateMe(data, options) {
  const account = await this.findById(options.accessToken.userId);
  return await account.updateAttributes({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    isMale: data.isMale,
    avatar: data.avatar
  });
}
