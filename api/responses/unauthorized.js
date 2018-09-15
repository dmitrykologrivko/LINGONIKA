module.exports = function unauthorized(message='Not authorized request') {

  const res = this.res;
  return res.status(401).json({'message': message});

};
