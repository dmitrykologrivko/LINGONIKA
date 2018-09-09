const schema = require('../../schemas/validation/card-schema');

module.exports = async (req, res) => {

  // TODO: Implement req.me
  let card = await Card.findOne({id: req.params.id, user: req.me || 1});
  if (!card) return res.notFound();

  const {isValid, fields} = await sails.helpers.validate(req.body, schema);
  if (isValid) return res.badRequest(fields);

  // TODO: Implement req.me
  card = await Card.update({id: req.params.id, user: req.me || 1})
    .set(req.body)
    .fetch()[0];

  return res.ok(card);

};
