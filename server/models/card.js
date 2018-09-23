'use strict';

const LANGUAGES = require('../constants/languages');
const PARTS_OF_SPEECH = require('../constants/parts-of-speech');

module.exports = function(Card) {
  applyValidationRules(Card);
  applyRemoteMethods(Card);
  disableRemoteMethods(Card);
};

function applyValidationRules(Card) {
  Card.validatesLengthOf('phrase', {max: 300});
  Card.validatesLengthOf('translation', {max: 300});
  Card.validatesLengthOf('comment', {max: 1000});
  Card.validatesLengthOf('example', {max: 4000});
  Card.validatesInclusionOf('fromLanguage', {in: Object.keys(LANGUAGES)});
  Card.validatesInclusionOf('toLanguage', {in: Object.keys(LANGUAGES)});
  Card.validatesInclusionOf('partOfSpeech', {in: Object.keys(PARTS_OF_SPEECH)});
}

function applyRemoteMethods(Card) {
  Card.meta = meta;

  Card.remoteMethod('meta', {
    description: 'Get meta data.',
    http: {
      path: '/meta',
      verb: 'get'
    },
    returns: [
      {arg: 'languages', type: 'object'},
      {arg: 'partsOfSpeech', type: 'object'}
    ]
  });
}

function disableRemoteMethods(Card) {
  Card.disableRemoteMethodByName('exists');
  Card.disableRemoteMethodByName('count');
  Card.disableRemoteMethodByName('replace');
  Card.disableRemoteMethodByName('createChangeStream');
  Card.disableRemoteMethodByName('replaceById');
  Card.disableRemoteMethodByName('replaceOrCreate');
  Card.disableRemoteMethodByName('patchOrCreate');
  Card.disableRemoteMethodByName('findOne');
  Card.disableRemoteMethodByName('updateAll');
  Card.disableRemoteMethodByName('upsertWithWhere');
}

async function meta() {
  return [LANGUAGES, PARTS_OF_SPEECH];
}
