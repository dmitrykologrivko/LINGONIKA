const LANGUAGES = require('../../chooses/languages');


module.exports = async (req, res) => {

  return res.ok({
    languages: LANGUAGES
  });

};
