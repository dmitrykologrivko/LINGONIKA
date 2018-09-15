const schema = require('../../schemas/validation/user-schema');

const FIELDS_TO_SELECT = [
  'email',
  'firstName',
  'lastName',
  'dateOfBirth',
  'isMale',
  'avatar'
];

module.exports = async (req, res) => {

  const validationOptions = {
    arguments: {
      userId: req.me.id
    }
  };

  // Validate a user
  const {isValid, fields} = await sails.helpers.validate(req.body, schema.update, validationOptions);
  if (!isValid) return res.badRequest(fields);

  // Update user
  await User.update({id: req.me.id}, req.body);

  // Get updated user with restricted fields
  const user = await User.findOne({select: FIELDS_TO_SELECT, where: {id: req.me.id}});

  return res.ok(user);

};
