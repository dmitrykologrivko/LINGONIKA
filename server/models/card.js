'use strict';

const LANGUAGES = require('../constants/languages');
const PARTS_OF_SPEECH = require('../constants/parts-of-speech');

/**
 * Card model
 */
module.exports = function(Card) {
  _applyValidationRules(Card);
  _applyRemoteMethods(Card);
};

// |\/| _  _| _ |     _ |. _| _ _|_. _  _
// |  |(_)(_|(/_|  \/(_|||(_|(_| | |(_)| |

/**
 * Apply validation rules to account model
 * @private
 */
function _applyValidationRules(Card) {
  Card.validatesLengthOf('phrase', {max: 300});
  Card.validatesLengthOf('translation', {max: 300});
  Card.validatesLengthOf('comment', {max: 1000});
  Card.validatesLengthOf('example', {max: 4000});
  Card.validatesInclusionOf('fromLanguage', {in: Object.keys(LANGUAGES)});
  Card.validatesInclusionOf('toLanguage', {in: Object.keys(LANGUAGES)});
  Card.validatesInclusionOf('partOfSpeech', {in: Object.keys(PARTS_OF_SPEECH)});
}

// |~) _  _ _  _ _|_ _    _ _  _ _|_|_  _  _| _
// |~\(/_| | |(_) | (/_  | | |(/_ | | |(_)(_|_\

/**
 * Apply remote methods to account model
 * @private
 */
function _applyRemoteMethods(Card) {
  Card.meta = _meta;
}

/**
 * Get cards meta data.
 * @returns {Promise<*[object]>} Dictionary with languages and pars of speech.
 * @private
 */
async function _meta() {
  return [LANGUAGES, PARTS_OF_SPEECH];
}
