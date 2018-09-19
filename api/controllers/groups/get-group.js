const GroupTransformer = require('../../transformers/GroupTransformer');

module.exports = async (req, res) => {

  let group = await Group.findOne({id: req.params.id, user: req.me.id});
  if (!group) return res.notFound();

  group = await GroupTransformer.transformOne(group);

  return res.ok(group);

};
