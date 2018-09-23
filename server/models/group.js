'use strict';

const LANGUAGES = require('../constants/languages');

module.exports = function(Group) {
  applyValidationRules(Group);
  disableRemoteMethods(Group)
};

function applyValidationRules(Group) {
  Group.validatesLengthOf('name', {max: 100});
  Group.validatesInclusionOf('fromLanguage', {in: Object.keys(LANGUAGES)});
  Group.validatesInclusionOf('toLanguage', {in: Object.keys(LANGUAGES)});
}

function disableRemoteMethods(Group) {
  Group.disableRemoteMethodByName('exists');
  Group.disableRemoteMethodByName('count');
  Group.disableRemoteMethodByName('replace');
  Group.disableRemoteMethodByName('createChangeStream');
  Group.disableRemoteMethodByName('replaceById');
  Group.disableRemoteMethodByName('replaceOrCreate');
  Group.disableRemoteMethodByName('patchOrCreate');
  Group.disableRemoteMethodByName('findOne');
  Group.disableRemoteMethodByName('updateAll');
  Group.disableRemoteMethodByName('upsertWithWhere');
  Group.disableRemoteMethodByName('prototype.__findById__cards');
  Group.disableRemoteMethodByName('prototype.__create__cards');
  Group.disableRemoteMethodByName('prototype.__delete__cards');
  Group.disableRemoteMethodByName('prototype.__destroyById__cards');
  Group.disableRemoteMethodByName('prototype.__get__cards');
  Group.disableRemoteMethodByName('prototype.__updateById__cards');
  Group.disableRemoteMethodByName('prototype.__count__cards');
}
