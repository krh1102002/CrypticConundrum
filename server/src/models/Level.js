const mongoose = require('mongoose')

const levelSchema = new mongoose.Schema({
    level: {type:Number,required:true},
    word:{type:String,required:true},
    alterWord:{type:String,required:true},
    image:{type:String,required:true}
})

module.exports = mongoose.model('levels',levelSchema)