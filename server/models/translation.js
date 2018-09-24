'use strict';

const LANGUAGES = require('../constants/languages');

/**
 * Translation model
 */
module.exports = function(Translation) {
  _applyValidationRules(Translation);
};

// |\/| _  _| _ |     _ |. _| _ _|_. _  _
// |  |(_)(_|(/_|  \/(_|||(_|(_| | |(_)| |

/**
 * Apply validation rules to account model
 * @param Translation
 * @private
 */
function _applyValidationRules(Translation) {
  Translation.validatesLengthOf('phrase', {max: 300});
  Translation.validatesLengthOf('translation', {max: 300});
  Translation.validatesLengthOf('comment', {max: 1000});
  Translation.validatesLengthOf('exampleOfPhrase', {max: 600});
  Translation.validatesLengthOf('exampleOfTranslation', {max: 600});
  Translation.validatesInclusionOf('fromLanguage', {in: Object.keys(LANGUAGES)});
  Translation.validatesInclusionOf('toLanguage', {in: Object.keys(LANGUAGES)});
}
