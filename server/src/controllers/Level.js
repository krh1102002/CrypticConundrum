const levelModel = require('../models/Level')

exports.createLevel = async(req,res) =>{
    try {
        const {level,word,image} = req.body

        const isPresent = await levelModel.findOne({level})
        if(isPresent)
            return res.status(400).json({message:"Level Already Created"})
        const data = await levelModel.create({
            level,
            word,
            image
        })
        return res.status(201).json({level:data})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
exports.deleteLevel = async(req,res) =>{
    try {
        const {_id} = req.body
        if(!_id)
            return res.status(400).json({message:"Bad Request"})
        
        await levelModel.findByIdAndDelete(_id)
        return res.status(200).json({message:"Level Deleted"})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

exports.updateLevel = async(req,res) =>{
    try {
        const data = {
            level: req.body?.level,
            word:req.body?.word,
            // alterWord:req.body?.alterWord,
            image:req.body?.image
        }
        const level = await levelModel.findByIdAndUpdate(req.body._id,data,{new:true})
        return res.status(200).json({level})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
exports.getAllLevel = async(req,res) =>{
    try {
        const levels = await levelModel.find()

        return res.status(200).json({levels});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}