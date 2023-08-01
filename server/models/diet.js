const mongoose = require('mongoose')


const DietSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    breakfast: {
        type: String,
        required: true
    },
    lunch: {
        type: String,
        required: true
    },
    dinner: {
        type: String,
        required: true
    },
    snacks: {
        type:String,
        required: false
    }
});

const Diet = mongoose.model('Diet', DietSchema)
module.exports = Diet

