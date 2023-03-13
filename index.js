require('dotenv').config();
const express = require('express');
const server = express();
const PORT = 3000;
const apiRouter = require('./api');
const morgan = require('morgan');
server.use(morgan('dev'));
server.use(express.json());
const {client} = require('./db');
client.connect();



server.use((req, res, next) =>{
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<____Body Logger END____>");

    next();
});

server.use('/api', apiRouter);

server.get('/', (req, res, next) =>{
    res.send("The HomePage");
})















server.listen(PORT, (req, res, next) =>{
    console.log(`Listening on port ${PORT}`);
});
