const bcrypt = require('bcryptjs');

function createHashFrom(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);  
}

function doesHashMatchPassword(hash, password) {
  return bcrypt.compareSync(hash, password);  
}

module.exports = {
  createHashFrom,
  doesHashMatchPassword  
};
