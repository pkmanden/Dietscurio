const mongoose = require('mongoose')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required:true
    },
    last_name: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

// userSchema.methods.setPassword = function(password) {
//     this.salt = crypto.randomBytes(16).toString('hex')
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 100, 64, 'sha512').toString('hex')
// }

// userSchema.methods.validPassword = function(password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
//     return this.hash === hash
// }

// userSchema.methods.generateJwt = function() {
//     var expiry = new Date();
//     expiry.setDate(expiry.getDate() + 7)

//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         name: this.name,
//         exp: parseInt(expiry.getTime() / 1000),
//     }, "MY_SECRET") //MY_SECRET environment variable
// }

module.exports = mongoose.model('User', userSchema);

