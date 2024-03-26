const express = require('express');
const lobbyRouter = express.Router();
const rootController = require('../controllers/lobby-controllers/root.controller');


lobbyRouter.get('/', rootController);


module.exports = lobbyRouter;