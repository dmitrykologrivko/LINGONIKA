/**
 * Group.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const LANGUAGES = require('../chooses/languages');

module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true,
      maxLength: 100
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

    cards: {
      collection: 'card',
      via: 'group'
    }

  },

};

