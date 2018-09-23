'use strict';

const LANGUAGES = require('../constants/languages');

module.exports = function(Translation) {
  applyValidationRules(Translation);
};

function applyValidationRules(Translation) {
  Translation.validatesLengthOf('phrase', {max: 300});
  Translation.validatesLengthOf('translation', {max: 300});
  Translation.validatesLengthOf('comment', {max: 1000});
  Translation.validatesLengthOf('exampleOfPhrase', {max: 600});
  Translation.validatesLengthOf('exampleOfTranslation', {max: 600});
  Translation.validatesInclusionOf('fromLanguage', {in: Object.keys(LANGUAGES)});
  Translation.validatesInclusionOf('toLanguage', {in: Object.keys(LANGUAGES)});
}
