const schema = require('../../schemas/validation/user-schema');

module.exports = async (req, res) => {

  // Validate a user and check if email already used
  const {isValid, fields} = await sails.helpers.validate(req.body, schema.register);
  if (isValid) return res.badRequest(fields);

  // Hash a password
  const {hash} = await sails.helpers.password.hashPassword(req.body.password);

  // Create a user
  let user = await User.create({...req.body, hashedPassword: hash}).fetch();

  return res.status(201).json(user);

};
