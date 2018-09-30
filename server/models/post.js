'use strict';

const LANGUAGES = require('../constants/languages');

const POST_TYPES = {
  'question': 'Question'
};

/**
 * Post model
 */
module.exports = function(Post) {
  _applyValidationRules(Post);
  _applyRemoteMethods(Post);
};

// |\/| _  _| _ |     _ |. _| _ _|_. _  _
// |  |(_)(_|(/_|  \/(_|||(_|(_| | |(_)| |

/**
 * Apply validation rules to account model
 * @private
 */
function _applyValidationRules(Post) {
  Post.validatesInclusionOf('type', {in: Object.keys(LANGUAGES)});
  Post.validatesLengthOf('question', {max: 300});
  Post.validatesLengthOf('comment', {max: 1000});
  Post.validatesInclusionOf('fromLanguage', {in: Object.keys(LANGUAGES)});
  Post.validatesInclusionOf('toLanguage', {in: Object.keys(LANGUAGES)});
}

// |~) _  _ _  _ _|_ _    _ _  _ _|_|_  _  _| _
// |~\(/_| | |(_) | (/_  | | |(/_ | | |(_)(_|_\

/**
 * Apply remote methods to account model
 * @private
 */
function _applyRemoteMethods(Post) {
  Post.postsMeta = _meta;
}

/**
 * Get posts meta data.
 * @returns {Promise<*[object]>} Dictionary with post types and languages.
 * @private
 */
async function _meta() {
  return [POST_TYPES, LANGUAGES];
}
