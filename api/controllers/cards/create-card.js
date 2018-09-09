const schema = require('../../schemas/validation/CardSchema');

module.exports = async (req, res) => {

  const {isValid, fields} = await sails.helpers.validate(req.body, schema);
  if (isValid) return res.badRequest(fields);

  // TODO: Implement req.me
  let newCard = await Card.create({...req.body, user: req.me || 1}).fetch();

  return res.ok(newCard);
};
