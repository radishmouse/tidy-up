const db = [];

// takes the data, puts it into an object
function create(name, givesJoy=false) {
  const newItem = {
    id: db.length, // cheesy way to create IDs
    name,
    givesJoy
  };

  db.push(newItem);
  return newItem.id;
}

function byID(id, existingItem) {
  return existingItem.id === id;
}

// retrieve one
function one(id) {
  return db.find(byID.bind(null, id));
}

// retrieve all
function all() {
  // creates a shallow copy of the array
  return [...db];
}

// udpate
function update(id, newName, newGivesJoy) {
  const index = db.findIndex(byID.bind(null, id));
  if (index !== -1) {
    db[index] = {
      id,
      name: newName,
      givesJoy, newGivesJoy      
    };
  }
}

// "del" -- because "delete" is a reserved word
function del(id) {
  const index = db.findIndex(byID.bind(null, id));
  if (index !== -1) {
    // alters the db in place
    db.splice(index, 1);
  }  
}

// An object with the methods for modifying our stuff
const stuff = {
  create,
  one,
  all,
  update,
  del
};

module.exports = stuff;

