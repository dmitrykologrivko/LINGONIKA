module.exports = async (req, res) => {

  // TODO: Implement req.me
  let card = await Card.findOne({id: req.params.id, user: req.me || 1});
  if (!card) return res.notFound();

  return res.ok(card);

};
