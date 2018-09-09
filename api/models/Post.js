/**
 * Post.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const LANGUAGES = require('../chooses/languages');

const POST_TYPES = {
  'question': 'Question'
};

module.exports = {

  post_types: POST_TYPES,

  attributes: {

    type: {
      type: 'string',
      required: true,
      isIn: Object.keys(POST_TYPES)
    },

    question: {
      type: 'string',
      maxLength: 300,
      allowNull: true
    },

    comment: {
      type: 'string',
      maxLength: 1000,
      allowNull: true
    },

    fromLanguage: {
      type: 'string',
      required: true,
      isIn: Object.keys(LANGUAGES)
    },

    toLanguage: {
      type: 'string',
      required: true,
      isIn: Object.keys(LANGUAGES)
    },

    user: {
      model: 'user',
      required: true
    },

    translations: {
      collection: 'translation',
      via: 'post'
    }

  },

};

