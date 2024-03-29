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
});

server.get('/background/:color', (req, res, next) =>{
    res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});


server.get('/add/:first/to/:second', (req, res, next) =>{
    res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
        Number(req.params.first) + Number(req.params.second)
       }</h1>`);
});














server.listen(PORT, (req, res, next) =>{
    console.log(`Listening on port ${PORT}`);
});
