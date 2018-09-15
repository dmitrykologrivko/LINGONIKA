module.exports = async (req, res) => {

  let card = await Card.findOne({id: req.params.id, user: req.me.id});
  if (!card) return res.notFound();

  await Card.destroy({id: req.params.id, user: req.me.id});

  return res.status(204).send();

};
