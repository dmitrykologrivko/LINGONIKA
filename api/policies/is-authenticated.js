module.exports = async (req, res, processed) => {

  if (!req.headers['authorization']) return res.unauthorized();

  const token = req.headers['authorization'];

  let decoded;

  try {
    decoded = await sails.helpers.jwt.verifyToken(token);
  } catch (e) {
    if (e.code === 'tokenExpired') {
      return res.unauthorized('Provided token is expired');
    } else if (e.code === 'tokenMalformed') {
      return res.unauthorized('Provided token is malformed');
    } else {
      throw e;
    }
  }

  const user = await User.findOne({id: decoded.id || 0});
  if (!user) return res.unauthorized('Could not identify user');

  req.me = user;

  return processed();

};
