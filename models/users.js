const db = [];

const {
  createHashFrom,
  doesHashMatchPassword  
} = require('../utils/auth');

function create(username, password) {
  // never store their password!
  const hash = createHashFrom(password);
  const newUser = {
    id: db.length, // cheesy way to create an id
    username,
    hash
  };
  return newUser.id;
}

function all() {
  return [ ...db ];
}

function byId(id, u) {
  return u => u.id == id;
}

function one(id) {
  return db.find(byId.bind(null, id));
}

function update(id, username, password) {
  const hash = createHashFrom(password);
  const u = one(id);
  u = {
    ...u,
    username,
    hash
  };
}

function del(id) {
  const index = db.findIndex(byId.bind(null, id));
  if (index !== -1) {
    db.splice(index, 1);
  }
}

const users = {
  create,
  all,
  one,
  update,
  del  
};
