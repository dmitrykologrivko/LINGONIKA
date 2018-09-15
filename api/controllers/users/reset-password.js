const schema = require('../../schemas/validation/user-schema');

module.exports = async (req, res) => {

  // Validate request
  const {isValid, fields} = await sails.helpers.validate(req.body, schema.resetPassword);
  if (isValid) return res.badRequest(fields);

  return res.ok();

};
