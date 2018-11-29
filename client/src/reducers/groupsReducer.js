// TODO: Temp solution
const initialState = {
  meta: {
    languages: {
      'ru': 'Russian',
      'en': 'English'
    },
    countLearnedWords: 0
  },
  selectedFromLanguage: 'ru',
  selectedToLanguage: 'en'
};

export default (state = initialState, action) => {
  return state;
}
