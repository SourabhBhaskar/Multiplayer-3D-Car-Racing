require('dotenv').config();
require('./src/db/connection.db')(); 
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
const lobbyRouter = require('./src/routes/lobby.route');



/**
 * Server
 */
const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server, { cors: process.env.CLIENT_URI });


/**
 * Cors
 */
const corsOptions = {
    origin: process.env.CLIENT_URI,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }
app.use(cors(corsOptions));


/**
 * Static
 */


/**
 * Routes
 */
app.use('/lobby', lobbyRouter);

/**
 * Start
 */
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});
