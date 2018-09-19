const LANGUAGES = require('../../chooses/languages');

module.exports = async (req, res) => {

  let countLearnedWords = 0;

  if (req.body && (req.body.fromLanguage && req.body.toLanguage)) {
    countLearnedWords = await Card.count({
      user: req.me.id,
      isLearned: true,
      fromLanguage: req.body.fromLanguage,
      toLanguage: req.body.toLanguage
    });
  } else {
    countLearnedWords = await Card.count({user: req.me.id, isLearned: true});
  }

  return res.ok({
    languages: LANGUAGES,
    countLearnedWords: countLearnedWords
  });

};
