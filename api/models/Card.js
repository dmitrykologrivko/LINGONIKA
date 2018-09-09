/**
 * Card.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const LANGUAGES = require('./chooses').languages;
const PARTS_OF_SPEECH = require('./chooses').partsOfSpeech;

module.exports = {

  schema: true,

  attributes: {

    phrase: {
      type: 'string',
      required: true,
      maxLength: 300
    },

    translation: {
      type: 'string',
      required: true,
      maxLength: 300
    },

    comment: {
      type: 'string',
      maxLength: 1000
    },

    example: {
      type: 'string',
      maxLength: 4000
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

    partOfSpeech: {
      type: 'string',
      allowNull: true,
      isIn: Object.keys(PARTS_OF_SPEECH)
    },

    isLearned: {
      type: 'boolean',
      defaultsTo: false
    },

    group: {
      model: 'group',
    },

    user: {
      model: 'user',
      required: true
    }

  },

};

