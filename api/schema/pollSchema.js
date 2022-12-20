const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pollSchema = new Schema({
       title: {
        type:String,
        require: true,
        unique:true,
        trim: true
       },
       description: {
        type:String,
        require: true,
        trim: true
       },
       totalVote: {
        type: Number,
        default: 0
       },
       option: {
           type: [{
               name: String,
               vote: Number 
           }]
       }
       
})

const Poll = mongoose.model('Poll',pollSchema)

module.exports = Poll 