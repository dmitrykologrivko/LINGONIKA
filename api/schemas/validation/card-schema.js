module.exports = {

  phrase: {
    type: 'string',
    required: true,
    max: 300
  },

  translation: {
    type: 'string',
    required: true,
    max: 300
  },

  comment: {
    type: 'string',
    max: 300
  },

  example: {
    type: 'string',
  },

  fromLanguage: {
    type: 'enum',
    required: true,
    enum: ['eng']
  },

  toLanguage: {
    type: 'enum',
    required: true,
    enum: ['eng']
  },

  partOfSpeech: {
    type: 'enum',
    required: true,
    enum: ['verb']
  },

  isLearned: {
    type: 'boolean'
  },

  group: {
    type: 'integer'
  }

};
