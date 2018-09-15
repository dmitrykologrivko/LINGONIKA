const schema = require('../../schemas/validation/card-schema');

module.exports = async (req, res) => {

  const {isValid, fields} = await sails.helpers.validate(req.body, schema);
  if (!isValid) return res.badRequest(fields);

  let card = await Card.create({...req.body, user: req.me.id}).fetch();

  return res.status(201).json(card);

};
