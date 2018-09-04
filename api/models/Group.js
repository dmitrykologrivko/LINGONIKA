/**
 * Group.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      maxLength: 100
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
    },

    cards: {
      collection: 'card',
      via: 'group'
    }

  },

};

