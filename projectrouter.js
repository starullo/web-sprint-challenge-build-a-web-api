const express = require('express');
const Project = require('./data/helpers/projectModel');

const router = express.Router();



//middleware!

const validateId = (req, res, next) => {
    const {id} = req.params;
    Project.get(id)
        .then(data=>{
            if (data) {
                req.projectData = data;
                next();
            } else {
                next({code: 400, message: 'There is no project with the id of ' + id})
            }
        })
        .catch(err=>{
            next({code: 500, message: 'There was an error retrieving your data'})
        })
}

const validateNewProject = (req, res, next) => {
    if (!req.body.description || !req.body.name) {
        next({code: 404, message: 'Description and Name are required fields'})
    } else {
        next();
    }
}

//actionzzz or endpoints or whatever you call it

router.get('/', (req, res)=>{
    Project.get()
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(err=>{
            res.status(500).json({message: 'Unable to retrieve data! So sorry'})
        })
})

router.get('/:id', validateId, (req, res)=>{
    try {
        res.status(200).json(req.projectData)
    } catch (error) {
        res.status(500).json({message: "We just simply can't"})
    }  
})

router.post('/', validateNewProject, (req, res)=>{
    try {
        Project.insert(req.body)
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(err=>{
            res.status(500).json({message: 'We can\'t do it right now sorry'})
        })
    } catch (error) {
        res.status(500).json({message: 'It\'s not gonna happen'})
    }
})

router.put('/:id', [validateId,validateNewProject], (req, res)=>{
    try {
        Project.update(req.params.id, req.body)
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(500).json({message: "There was an error updating that project"})
        })
    } catch (error) {
        res.status(500).json({message: 'We can\'t do it right now'})
    }
})

router.delete('/:id', validateId, (req, res)=>{
    try {
        Project.remove(req.params.id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({message: 'Now is not a good time, sorry'})
        })
    } catch (error) {
        res.status(500).json({message: 'There was an error deleting the project with the id of ' + req.params.id})
    }
})

//error handler

router.use((err, req, res, next)=>{
    res.status(err.code).json({message: err.message})
})
 
module.exports = router;