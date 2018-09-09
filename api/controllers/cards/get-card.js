module.exports = async (req, res) => {

  let card = await Card.findOne({ id: req.params.id, user: req.me || 1 });
  if (!card) return res.notFound();

  return res.ok(card);

};
