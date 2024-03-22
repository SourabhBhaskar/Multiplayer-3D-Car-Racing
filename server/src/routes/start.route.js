const express = require('express');
const startRouter = express.Router();
const start = require('../controllers/start-controllers/start.controller');


startRouter.get('/', start);


module.exports = startRouter;