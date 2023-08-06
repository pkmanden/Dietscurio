const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const { createSuccess } = require('../utils/success');
const { createError } = require('../utils/error');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hash,
            email: req.body.email,
            gender: req.body.gender
        });

        await newUser.save();
        return next(createSuccess(200, "User Registration Successful!"));
        // return res.status(200).send("User Registration Successful!");
    } catch (error) {
        return next(createError(500, "User Registration Failed!"));
        // return res.status(500).send("User Registration Failed!");
    }

}

module.exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return next(createError(404, "User not found!"));
            // return res.status(404).send("User not found!");
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isValidPassword) {
            return next(createError(400, "Incorrect Password!"));
            // return res.status(400).send("Incorrect Password!");
        }
        console.log("process.env.JWT_SECRET : " + process.env.JWT_SECRET)
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET
        )
        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "Login Successful!",
            data: user
        });
        // return next(createSuccess(200, "Login Successful!"));
        // return res.status(200).send("Login Successful!");
    } catch (error) {
        return next(createError(500, "Something went wrong!"));
        // return res.status(500).send("Something went wrong!");
    }
}