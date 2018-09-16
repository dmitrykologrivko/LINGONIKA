const schema = require('../../schemas/validation/group-schema');


module.exports = async (req, res) => {

  const {isValid, fields} = await sails.helpers.validate(req.body, schema);
  if (!isValid) return res.badRequest(fields);

  const group = await Group.create({
    name: req.body.name,
    fromLanguage: req.body.fromLanguage,
    toLanguage: req.body.toLanguage,
    user: req.me.id
  }).fetch();

  return res.status(201).json(group);

};
