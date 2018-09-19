const schema = require('../../schemas/validation/group-schema');
const GroupTransformer = require('../../transformers/GroupTransformer');

module.exports = async (req, res) => {

  const {isValid, fields} = await sails.helpers.validate(req.body, schema);
  if (!isValid) return res.badRequest(fields);

  let group = await Group.create({
    name: req.body.name,
    fromLanguage: req.body.fromLanguage,
    toLanguage: req.body.toLanguage,
    user: req.me.id
  }).fetch();

  group = await GroupTransformer.transformOne(group);

  return res.status(201).json(group);

};
