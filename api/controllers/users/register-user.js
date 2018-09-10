const schema = require('../../schemas/validation/user-schema');

module.exports = async (req, res) => {

  const {isValid, fields} = await sails.helpers.validate(req.body, schema.register);
  if (isValid) return res.badRequest(fields);

  let user = await User.create(req.body).fetch();

  res.status(201).json(user);

};
