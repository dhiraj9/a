const express = require('express')
const cors = require('cors')
var morgan = require('morgan');
var fs=require('fs')
const {mongoose} = require('./Config/database') // mongoose without {} if single value is passed
const app = express()
app.use(morgan('combined'));

const { usersRouter } = require('./app/Controller/userController') 

//for heroku 
const path = require("path")
const port = process.env.PORT || 3005
// var LogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// var LogStream2 = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });
// app.use(morgan('combined', { stream: LogStream },{skip: function (req, res) { return res.statusCode < 400 }}));
// app.use(morgan('combined', { stream: LogStream2 },{skip: function (req, res) { return res.statusCode >= 400 }}));
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
  }))
   
  // log all requests to access.log
  app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }))
app.use(express.json())
app.use(cors())


app.use('/users',usersRouter)

app.use(express.static(path.join(__dirname,"client/build")))

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})


app.listen(port ,() =>{
    console.log('Listening on port', port)
})
