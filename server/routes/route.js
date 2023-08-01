const express = require('express');
const User = require('../models/user');
const Diet = require('../models/diet');
const router = express.Router();


router.post('/register', (req, res)=> {
    // let newUser = new User({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     username: req.body.user_name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    User.create(req.body)
        .then(data => res.send(data))
        .catch(err => console.log('Error : ' + err))
});

router.post('/diet', (req, res)=> {
    Diet.create(req.body)
        .then(data => res.send(data))
        .catch(err => console.log('Error : ' + err))
});

module.exports = router;

