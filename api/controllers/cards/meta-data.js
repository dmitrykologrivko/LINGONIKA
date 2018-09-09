const LANGUAGES = require('../../chooses/languages');
const PARTS_OF_SPEECH = require('../../chooses/parts-of-speech');

module.exports = async (req, res) => {

  res.ok({
    languages: LANGUAGES,
    partsOfSpeech: PARTS_OF_SPEECH
  });

};
