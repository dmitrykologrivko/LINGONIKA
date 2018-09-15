module.exports = async (req, res) => {

  const cards = await Card.find({user: req.me.id});
  return res.ok(cards);

};
