const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const app = express()

// internal require
const createPollRouter = require('./api/controllers/createpoll')
const allPollRouter = require('./api/controllers/polls')
const singlePollRouter = require('./api/controllers/viewPoll')

// process.env config
dotenv.config()

// set template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')


const Port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// connect to mongodb database
mongoose.connect('mongodb://127.0.0.1/poll-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('db is connect successfully');
  })
  .catch(e => {
       console.log(e);
  })


  // use createPoll middleware function
  app.use('/',createPollRouter)
  app.use('/',allPollRouter)
  app.use('/',singlePollRouter)

  
  app.get('/',(req,res) => {
         res.send('Home')
  })

  app.listen(Port,() => {
    console.log(`server is running on port: ${Port}`);
  })