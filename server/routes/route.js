const express = require('express')
const User = require('../models/user')
const Diet = require('../models/diet')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId
const { expressjwt: jwt } = require('express-jwt')
// var { expressjwt: jwt } = require("express-jwt");

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload',
    algorithms: ['RS256']
})

var ctrlProfile = require('../controllers/profile')
var ctrlAuth = require('../controllers/auth.controller')


router.get('/profile', auth, ctrlProfile.profileRead)

router.post('/register', ctrlAuth.register)
router.post('/login', ctrlAuth.login)

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

