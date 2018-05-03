/* server.js */

'use strict';
var env = require('node-env-file');
env(__dirname+'/.env');
const express = require('express');
const app = express();
const port = process.env.PORT || 4205;
const router = express.Router();
const bot = require('./chatbot');


// start server
bot.init.slackBot();

app.listen(port, function (req, res) {
    console.info(`Started Express server on port ${port}`);
      
        
});