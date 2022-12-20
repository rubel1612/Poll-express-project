const express = require('express')
const Poll = require('../schema/pollSchema')
const router = express.Router()

router.get('/createPoll',(req,res) => {
   
    res.render('index')
})

router.post('/createPoll',(req,res) => {
    console.log(req.body);
      let {title,description,option} = req.body
       option = option.map( value => {
           return {
                name: value,
                vote: 0   
           }
      })
       const poll = new Poll({
        title,
        description,
        option
       })

       if(title && title.length > 0){
        poll.save()
        .then(data => {
           res.redirect('/polls')
        
        })
        .catch(e => {
         res.json({
             error: 'error occured',
             e
           })
        })
       }
       else{
           res.json({
              error: "empty title."
           })
       }
       
})

module.exports = router 