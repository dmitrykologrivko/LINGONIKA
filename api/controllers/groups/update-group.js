const schema = require('../../schemas/validation/group-schema');
const GroupTransformer = require('../../transformers/GroupTransformer');

module.exports = async (req, res) => {

  let group = await Group.findOne({id: req.params.id, user: req.me.id});
  if (!group) return res.notFound();

  const {isValid, fields} = await sails.helpers.validate(req.body, schema);
  if (!isValid) return res.badRequest(fields);

  const groups = await Group.update({id: req.params.id, user: req.me.id})
    .set({
      name: req.body.name,
      fromLanguage: req.body.fromLanguage,
      toLanguage: req.body.toLanguage
    })
    .fetch();

  group = await GroupTransformer.transformOne(groups[0]);

  return res.ok(group);

};
