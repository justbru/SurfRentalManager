/**
 * server.js
 * This is the main server class to connect and set up mongoDB and server
 */

const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection')

const app = express()

dotenv.config( {path:'config.env'})
const PORT = process.env.PORT || 8080

// Log requests
app.use(morgan('tiny'))

// mongoDB connection
connectDB();

// Log requests
app.use(bodyparser.urlencoded({extended:true}))

// Set view engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, "views/ejs")) -> use this if ejs files are in specific folder

// load assets 
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{console.log('Server is running on http://localhost:%s', PORT)});