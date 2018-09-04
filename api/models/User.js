/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    email: {
      type: 'string',
      required: true,
      unique: true
    },

    firstName: {
      type: 'string',
      required: true,
      maxLength: 100
    },

    lastName: {
      type: 'string',
      required: true,
      maxLength: 100
    },

    dateOfBirth: {
      type: 'ref',
      columnType: 'datetime',
      required: true
    },

    isMale: {
      type: 'boolean',
      defaultsTo: true
    },

    avatar: {
      type: 'string',
      allowNull: true,
    },

    isSuperUser: {
      type: 'boolean',
      defaultsTo: false
    },

    cards: {
      collection: 'card',
      via: 'user'
    },

    groups: {
      collection: 'group',
      via: 'user'
    },

    posts: {
      collection: 'post',
      via: 'user'
    },

    translations: {
      collection: 'translations',
      via: 'user'
    }

  },

};

