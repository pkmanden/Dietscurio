
const { createSuccess } = require('../utils/success');
const { createError } = require('../utils/error');


const mongoose = require('mongoose');
const User = mongoose.model('User');
const Diet = mongoose.model('Diet');


module.exports.getById = async (req, res, next) => {
    // try {
    //     const user = await User.findById({_id: req.params.id});
    //     if(!user) {
    //         return next(createError(404, "User not found!"));
    //     }
    //     return next(createSuccess(200, "Single User", user));
    // } catch (error) {
    //     return next(createError(500, "Internal Server Error!"));
    // }
    let data = {};
    User.findById({_id: req.params.id})
    .then(userData => {
        data.user = userData;
        Diet.find({ user: req.params.id }).sort({"date": -1})
            .then(dietData => {
                data.diet = dietData;
                return next(createSuccess(200, "Single User", data));
            })
            .catch(error => {
                return next(createError(404, "Diet not found!"));
            })
    })
    .catch(error => {
        return next(createError(404, "User not found!"));
    })

}