module.exports = async (req, res) => {

  // TODO: Implement filter by req.me
  return res.ok(await Card.find());

};
