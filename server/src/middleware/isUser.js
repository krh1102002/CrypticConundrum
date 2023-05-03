const jwt = require('jsonwebtoken')
const userModel = require('../models/User')
const isUser = async(req,res,next) =>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = jwt.verify(token,process.env.JWT_SECRET)
            if(!user)
                return res.status(400).json({message:"Not Authorized"})
                
            req.user = await userModel.findById(user._id)
            next()
        } catch (error) {
            return res.status(400).json({message:error.message})
        }
    }else{
        return res.status(400).json({message:"Not Authorized"})
    }
}

module.exports = isUser