const express = require('express');
const User = require('../models/user');
const Diet = require('../models/diet');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');
const { getById } = require('../controllers/user.controller');
const { verifyToken } = require('../utils/verifyToken');
const { addDiet } = require('../controllers/diet.controller');



router.post('/register', register);
router.post('/login', login);
router.get('/logout', verifyToken, logout);
router.get('/profile/:id', getById);
router.post('/diet/add', addDiet);



module.exports = router

