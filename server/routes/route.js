const express = require('express')
const User = require('../models/user')
const Diet = require('../models/diet')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId


router.post('/register', (req, res)=> {
    // let newUser = new User({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     username: req.body.user_name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    User.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => console.log('Error : ' + err))
});

router.post('/diet', (req, res)=> {
    Diet.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => console.log('Error : ' + err))
});

router.get('/user/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id) == false)
    {
        res.status(400).json({
            error: 'Invalid id'
        })
    }
    else 
    {
        User.findById(req.params.id)
            .then(data => {
                if(data)
                    res.send(data)
                else
                    res.status(404).json({
                        error: 'No user found with the id: '+ req.params.id
                    })
            })
            .catch(err => console.log('Error : ' + err))
    }
});

module.exports = router

