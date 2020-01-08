const http = require('http');
const express = require('express');
const app = express();

const PORT = 3000;
const server = http.createServer(app);

const morgan = require('morgan');
const logger = morgan('tiny');
app.use(logger);

const helmet = require('helmet');
app.use(helmet());

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
  extended: true
});

const { stuffController } = require('./controllers');

app.get('/create', stuffController.getForm);
app.get('/create', parseForm, stuffController.postForm);

app.get('/', stuffController.list);
app.get('/:id', stuffController.detail);

app.get('/:id/edit', stuffController.getForm);
app.post('/:id/edit', parseForm, stuffController.postForm);

server.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
