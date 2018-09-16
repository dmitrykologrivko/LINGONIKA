module.exports = async (req, res) => {

  const groups = await Group.find({user: req.me.id});
  return res.ok(groups);

};
