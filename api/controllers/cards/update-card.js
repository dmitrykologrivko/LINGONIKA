const schema = require('../../schemas/validation/card-schema');

module.exports = async (req, res) => {

  let card = await Card.findOne({id: req.params.id, user: req.me.id});
  if (!card) return res.notFound();

  const {isValid, fields} = await sails.helpers.validate(req.body, schema);
  if (isValid) return res.badRequest(fields);

  const cards = await Card.update({id: req.params.id, user: req.me.id}, req.body).fetch();

  return res.ok(cards[0]);

};
