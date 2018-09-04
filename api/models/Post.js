/**
 * Post.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    type: {
      type: 'string',
      required: true
      // isIn: []
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
      required: true
      // isIn: []
    },

    toLanguage: {
      type: 'string',
      required: true
      // isIn: []
    },

    user: {
      model: 'user'
    }

  },

};

