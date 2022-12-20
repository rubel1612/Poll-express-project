const express = require('express')
const Poll = require('../schema/pollSchema')
const router = express.Router()

router.get('/polls/:id',(req,res) => {
    const id = req.params.id 
       Poll.findById(id)
       .then(poll => {
            let option = [...poll.option]
            let result = []
            option.forEach(value => {
                  let percentage = (value.vote * 100) /  poll.totalVote
                
                  result.push({
                      ...value._doc,
                      percentage: percentage ? percentage : 0
                  })
            })
            res.render('viewPoll',{poll,result})
       })
       .catch(e => {
         res.json({
            error: e
         })
       })
})

router.post('/polls/:id',async (req,res) => {
    const id = req.params.id 
    const optionId = req.body.option
    try {
        let poll = await Poll.findById(id)
        let option = [...poll.option]
       
        let index = option.findIndex(i => i.id === optionId)
         option[index].vote = option[index].vote + 1
         let totalVote = poll.totalVote + 1 

         await Poll.findOneAndUpdate(
            {_id: poll._id},
            {$set: {option,totalVote}}
         )
        res.redirect(`/polls/${id}`)

    } catch (error) {
        res.send(error)
    }
     
     
})


module.exports = router 