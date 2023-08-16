const mongoose = require('mongoose');
const Diet = mongoose.model('Diet');
const { createSuccess } = require('../utils/success');
const { createError } = require('../utils/error');

module.exports.addDiet = async (req, res, next)=> {

    try {
        const newDiet = new Diet({
            date: req.body.date,
            weight: req.body.weight,
            user: req.body.user,
            breakfast: req.body.breakfast,
            lunch: req.body.lunch,
            dinner: req.body.dinner,
            snacks: req.body.snacks
        });

        console.log(newDiet)
        await newDiet.save();
       
        return next(createSuccess(200, "Diet added successfully!"));
        // return res.status(200).send("User Registration Successful!");
    } catch (error) {
        return next(createError(500, "Could not add diet!"));
        // return res.status(500).send("User Registration Failed!");
    }
}

