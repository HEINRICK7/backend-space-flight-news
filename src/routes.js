const express = require('express');

const routes = express.Router();

const NewsController = require('./controllers/NewsController');

routes.get('/', NewsController.indexInitial);

routes.get('/articles', NewsController.index);
routes.get('/articles/:title', NewsController.show);

module.exports = routes;