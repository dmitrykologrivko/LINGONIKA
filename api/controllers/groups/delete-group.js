module.exports = async (req, res) => {

  const group = await Group.findOne({id: req.params.id, user: req.me.id});
  if (!group) return res.notFound();

  await Group.destroy({id: req.params.id, user: req.me.id});

  return res.status(204).send();

};
