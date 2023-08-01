const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const route = require('./routes/route')

var app = express()

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

const PORT = 3000

app.use(cors())

app.use(bodyParser.json())

app.use('/api', route)

app.listen(PORT, ()=> {
    console.log("Server has been started on port :" + PORT)
})