/**
 * Card.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

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
      required: true
      // isIn: []
    },

    toLanguage: {
      type: 'string',
      required: true
      // isIn: []
    },

    partOfSpeech: {
      type: 'string',
      allowNull: true,
      // isIn: []
    },

    isLearned: {
      type: 'boolean',
      defaultsTo: false
    },

    group: {
      model: 'group',
    },

    user: {
      model: 'user'
    }

  },

};

