const express = require('express');
const projectRouter = require('./projectrouter')
const actionRouter = require('./actionrouter');
const Actions = require('./data/helpers/actionModel')


const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/projects', actionRouter);


server.get('/', (req, res)=>{
    res.send(`LET'S DO THIS THANGGG YAY`);
});

server.get('/api/actions', (req, res)=>{
    Actions.get()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        res.status(500).json({message: 'Something went wrong, sorry'})
    })
    
})

module.exports = server;