module.exports = async (req, res) => {

  const group = await Group.findOne({id: req.params.id, user: req.me.id});
  if (!group) return res.notFound();

  return res.ok(group);

};
