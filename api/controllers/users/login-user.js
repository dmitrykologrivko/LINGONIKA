const schema = require('../../schemas/validation/user-schema');

module.exports = async (req, res) => {

  // Validate a login data and check if user exists
  const {isValid, fields} = await sails.helpers.validate(req.body, schema.login);
  if (!isValid) return res.badRequest(fields);

  // Get a user
  const user = await User.findOne({email: req.body.username});

  // Generated a token
  const token = await sails.helpers.jwt.signToken(user);

  return res.ok({access_token: token});

};
