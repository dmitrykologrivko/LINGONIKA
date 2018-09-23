'use strict';

const LANGUAGES = require('../constants/languages');

const POST_TYPES = {
  'question': 'Question'
};

module.exports = function(Post) {
  applyValidationRules(Post);
  disableRemoteMethods(Post);
};

function applyValidationRules(Post) {
  Post.validatesInclusionOf('type', {in: Object.keys(LANGUAGES)});
  Post.validatesLengthOf('question', {max: 300});
  Post.validatesLengthOf('comment', {max: 1000});
  Post.validatesInclusionOf('fromLanguage', {in: Object.keys(LANGUAGES)});
  Post.validatesInclusionOf('toLanguage', {in: Object.keys(LANGUAGES)});
}

function disableRemoteMethods(Post) {
  Post.disableRemoteMethodByName('exists');
  Post.disableRemoteMethodByName('count');
  Post.disableRemoteMethodByName('replace');
  Post.disableRemoteMethodByName('createChangeStream');
  Post.disableRemoteMethodByName('replaceById');
  Post.disableRemoteMethodByName('replaceOrCreate');
  Post.disableRemoteMethodByName('patchOrCreate');
  Post.disableRemoteMethodByName('findOne');
  Post.disableRemoteMethodByName('updateAll');
  Post.disableRemoteMethodByName('upsertWithWhere');
  Post.disableRemoteMethodByName('prototype.__count__translations');
}
