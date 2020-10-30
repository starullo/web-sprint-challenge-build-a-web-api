const express = require('express');
const projectRouter = require('./projectrouter')
const actionRouter = require('./actionrouter');


const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/projects', actionRouter);


server.get('/', (req, res)=>{
    res.send(`LET'S DO THIS THANGGG YAY`);
});

module.exports = server;