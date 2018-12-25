'use strict';

const LANGUAGES = require('../constants/languages');

/**
 * Group model
 * @param Group
 */
module.exports = function(Group) {
  _applyValidationRules(Group);
  _applyObservers(Group);
  _applyRemoteMethods(Group);
};

// |\/| _  _| _ |     _ |. _| _ _|_. _  _
// |  |(_)(_|(/_|  \/(_|||(_|(_| | |(_)| |

/**
 * Apply validation rules to group model
 * @private
 */
function _applyValidationRules(Group) {
  Group.validatesLengthOf('name', {max: 100});
  Group.validatesInclusionOf('fromLanguage', {in: Object.keys(LANGUAGES)});
  Group.validatesInclusionOf('toLanguage', {in: Object.keys(LANGUAGES)});
}

// |\/| _  _| _ |  /~\|_  _ _  _  _  _ _
// |  |(_)(_|(/_|  \_/|_)_\(/_|\/(/_| _\

/**
 * Apply observers to group model
 * @private
 */
function _applyObservers(Group) {
  Group.observe('loaded', async (ctx) => {
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

// |~) _  _ _  _ _|_ _    _ _  _ _|_|_  _  _| _
// |~\(/_| | |(_) | (/_  | | |(/_ | | |(_)(_|_\

/**
 * Apply remote methods to group model
 * @private
 */
function _applyRemoteMethods(Group) {
  Group.groupsMeta = _meta;
}

/**
 * Get groups meta data.
 * @param fromLanguage From language argument allows filtering countOfLearnedWords by language.
 * @param toLanguage To language argument allows filtering countOfLearnedWords by language.
 * @returns {Promise<*[object, number]>} Dictionary with languages and count of learned words.
 * @private
 */
async function _meta(fromLanguage, toLanguage) {
  const Card = this.app.models.Card;

  let countLearnedWords = 0;
  let countWords = 0;
  if (fromLanguage && toLanguage) {
    countLearnedWords = await Card.count({isLearned: true, fromLanguage: fromLanguage, toLanguage: toLanguage});
    countWords = await Card.count({fromLanguage: fromLanguage, toLanguage: toLanguage});
  } else {
    countLearnedWords = await Card.count({isLearned: true});
    countWords = await Card.count();
  }

  return [LANGUAGES, countLearnedWords, countWords];
}
