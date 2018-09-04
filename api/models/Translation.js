/**
 * Translation.js
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
      maxLength: 1000,
      allowNull: true
    },

    exampleOfPhrase: {
      type: 'string',
      maxLength: 600,
      allowNull: true
    },

    exampleOfTranslation: {
      type: 'string',
      maxLength: 600,
      allowNull: true
    },

    user: {
      model: 'user'
    }

  },

};

