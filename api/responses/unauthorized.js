module.exports = function unauthorized(message='Non authorized request') {

  const res = this.res;
  return res.status(401).json({'message': message});

};
