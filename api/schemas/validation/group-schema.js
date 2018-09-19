module.exports = {

  name: {
    type: 'string',
    required: true,
    max: 100
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

};
