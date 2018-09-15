const FIELDS_TO_SELECT = [
  'email',
  'firstName',
  'lastName',
  'dateOfBirth',
  'isMale',
  'avatar'
];

module.exports = async (req, res) => {

  const user = await User.findOne({select: FIELDS_TO_SELECT, where: {id: req.me.id}});
  return res.ok(user);

};
