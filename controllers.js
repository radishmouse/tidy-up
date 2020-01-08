const { stuff } = require('./models');

const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
};

function list(req, res) {
  const stuffListItems = stuff.all().map(item => `
<li>
  <a href="/${item.id}">${item.name}</a>
</li>
  `);

  res.render('list', {
    locals: {
      stuffListItems
    },
    partials
  });
}

function detail(req, res) {
  const {id} = req.params;
  const item = stuff.one(id);

  let stuffDetails = `
<h1>${item.name}</h1>
<p>
  <a href="/${item.id}/edit">Edit this item</a>
</p>
`;
  
  res.render('detail', {
    locals: {
      stuffDetails
    },
    partials
  });
}

function getForm(req, res) {
  const {id} = req.params;
  const item = stuff.one(id);
  res.render('form', {
    locals: {
      item
    },
    partials
  });
  
}

function postForm(req, res) {
  const {id} = req.params;
  const {name, givesJoy} = req.body;
  // Is this an existing item, or a new one?
  if (id) {
    stuff.update(id, name, givesJoy);
    // Send them back to the editing form 
    res.redirect(req.url);    
  } else {
    const newId = stuff.create(name, givesJoy);
    // Send them back to the editing form 
    res.redirect(`/${newId}/edit`);    
  }
}


const stuffController = {
  list,
  detail,
  getForm,
  postForm
};

module.exports = {
  stuffController
};
