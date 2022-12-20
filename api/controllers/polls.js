const express = require('express')
const Poll = require('../schema/pollSchema')
const router = express.Router()

router.get('/polls',(req,res) => {
       Poll.find()
       .then(polls => {
            res.render('polls',{polls})
       })
       .catch(e => {
         res.json({
            error: e
         })
       })
})



module.exports = router 