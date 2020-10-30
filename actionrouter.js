const express = require('express');
const Action = require('./data/helpers/actionModel');
const Project = require('./data/helpers/projectModel');

const router = express.Router();



//middleware!

const validateActionId = (req, res, next) => {
    const {actionId} = req.params;
    Action.get(id)
        .then(data=>{
            if (data) {
                req.actionData = data;
                next();
            } else {
                next({code: 400, message: 'There is no action with the id of ' + id})
            }
        })
        .catch(err=>{
            next({code: 500, message: 'There was an error retrieving your data'})
        })
}

const validateProjectId = (req, res, next) => {
    const {projectId} = req.params;
    Project.get(projectId)
        .then(data=>{
            if (data) {
            req.actions = data.actions;
            req.projectId = projectId;
            next();
            } else {
                next({code: 404, message: 'There is no project with the id of ' + projectId})
            }
        })
        .catch(err=>{
            next({code: 500, message: 'Unable to do that right now sorry'})
        })

}

const validateNewAction = (req, res, next) => {
    if (!req.body.description || !req.body.notes || !req.body.project_id) {
        next({code: 404, message: 'Description, Notes, and Project ID are required fields'})
    }  else if (req.body.project_id != req.projectId) {
        console.log(req.body.project_id, req.projectId)
        next({code: 404, message: 'The project id in the request must be the same as the one you entered in the url'})
    }
    else {
        next();
    }
}

//actionzzz or endpoints or whatever you call it

// router.get('/', (req, res)=>{
//     Action.get()
//         .then(data=>{
//             res.status(201).json(data);
//         })
//         .catch(err=>{
//             res.status(500).json({message: 'Unable to retrieve data! So sorry'})
//         })
// })

router.get('/:projectId/actions', validateProjectId, (req, res)=>{
    try {
        res.status(200).json(req.actions)
    } catch (error) {
        res.status(500).json({message: "We just simply can't"})
    }  
})

router.post('/:projectId/actions', [validateProjectId, validateNewAction], (req, res)=>{
    try {
        console.log(req.body)
        Action.insert(req.body)
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(err=>{
            console.log(err.message)
            res.status(500).json({message: 'We can\'t do it right now sorry'})
        })
    } catch (error) {
        res.status(500).json({message: 'It\'s not gonna happen'})
    }
})

router.put('/:projectId/actions/:actionId',  (req, res)=>{
    try {
        if (req.body.description && req.body.notes) {
        Action.update(req.params.actionId, {...req.body, project_id: req.params.projectId})
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            res.status(500).json({message: "There was an error updating that action"})
        })
    } else {
        res.status(404).json({message: 'Description and Notes are required fields'})
    }
    } catch (error) {
        res.status(500).json({message: 'We can\'t do it right now'})
    }
})

router.delete('/:projectId/actions/:actionId', (req, res)=>{
    try {
        Action.remove(req.params.actionId)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({message: 'Now is not a good time, sorry'})
        })
    } catch (error) {
        res.status(500).json({message: 'There was an error deleting the action with the id of ' + req.params.id})
    }
})

//error handler

router.use((err, req, res, next)=>{
    res.status(err.code).json({message: err.message})
})
 
module.exports = router;