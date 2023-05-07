const mongoose = require('mongoose')

const levelSchema = new mongoose.Schema({
    level: {type:Number,required:true,unique:true},
    word:{type:String,required:true},
    image:{type:String,required:true}
})

levelSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    this.word = await bcrypt.hash(this.word, salt);
});

module.exports = mongoose.model('levels',levelSchema)