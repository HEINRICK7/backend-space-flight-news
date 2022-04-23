const express = require('express');

const routes = express.Router();

const NewsController = require('./controllers/NewsController');

routes.get('/', NewsController.indexInitial);

routes.get('/articles', NewsController.index);
routes.post('/articles', NewsController.store)
routes.get('/articles/:_id', NewsController.show);
routes.delete('/articles/:_id', NewsController.destroy);
routes.put('/articles/:_id', NewsController.update);

module.exports = routes;