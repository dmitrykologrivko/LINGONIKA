const GroupTransformer = require('../../transformers/GroupTransformer');

module.exports = async (req, res) => {

  let groups = await Group.find({user: req.me.id});

  groups = await GroupTransformer.transformList(groups);

  return res.ok(groups);

};
