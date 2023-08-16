const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

require('dotenv').config(); 
const route = require('./routes/route')
var cookieParser = require('cookie-parser')

var app = express()
const PORT = 3000


mongoose.connect('mongodb://localhost:27017/dietscurio')

mongoose.connection.on('connected', ()=> {
    console.log('Connected to mongodb @ 27017')
})

mongoose.connection.on('error', (err)=> {
    if(err)
    {
        console.log('Error in databse connection: ' + err)
    }
})


app.use(cors())

app.use(bodyParser.json())
app.use(cookieParser())


app.use('/api', route)

//Response handler middleware

app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});

//error handlers
// app.use(function(err, req, res, next) {
//     if(err.name === 'UnauthorizedError') {
//         res.status(401)
//         res.json({
//             "message":  err.name + ": " + err.message
//         })
//     }
// })

app.listen(PORT, ()=> {
    console.log("Server has been started on port :" + PORT)
})