'use strict';

const LANGUAGES = require('../constants/languages');

module.exports = function(Group) {
  applyValidationRules(Group);
  applyObservers(Group);
  applyRemoteMethods(Group);
  disableRemoteMethods(Group);
};

function applyValidationRules(Group) {
  Group.validatesLengthOf('name', {max: 100});
  Group.validatesInclusionOf('fromLanguage', {in: Object.keys(LANGUAGES)});
  Group.validatesInclusionOf('toLanguage', {in: Object.keys(LANGUAGES)});
}

function applyObservers(Group) {
  Group.observe('loaded', async function(ctx) {
    const Card = Group.app.models.Card;
    if (ctx.data) {
      ctx.data.countLearnedWords = await Card.count({groupId: ctx.data.id, isLearned: true});
      ctx.data.countWords = await Card.count({groupId: ctx.data.id});
      return Promise.resolve();
    } else {
      return Promise.resolve();
    }
  });
}

function applyRemoteMethods(Group) {
  Group.meta = meta;

  Group.remoteMethod('meta', {
    description: 'Get meta data.',
    http: {
      path: '/meta',
      verb: 'get'
    },
    accepts: [
      {arg: 'fromLanguage', type: 'string'},
      {arg: 'toLanguage', type: 'string'},
    ],
    returns: [
      {arg: 'languages', type: 'object'},
      {arg: 'countLearnedWords', type: 'number'}
    ]
  });
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

async function meta(fromLanguage, toLanguage) {
  const Card = this.app.models.Card;

  let countLearnedWords = 0;
  if (fromLanguage && toLanguage) {
    countLearnedWords = await Card.count({isLearned: true, fromLanguage: fromLanguage, toLanguage: toLanguage});
  } else {
    countLearnedWords = await Card.count({isLearned: true});
  }

  return [LANGUAGES, countLearnedWords];
}
