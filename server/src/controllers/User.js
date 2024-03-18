const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = (_id) =>{
    const token = jwt.sign({_id},process.env.JWT_SECRET)

    return token;
}
exports.signIn = async(req,res) =>{
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if(!user)
            return res.status(404).json({message:"Invalid Credentials"})
        
        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if(!isPasswordMatch)
            return res.status(400).json({message:"Invalid Credentials"})
        const token = generateToken(user._id)
        const userData = {
            name:user.name,
            email:user.email,
            prn:user.prn,
            level:user.level,
            year:user.year,
            isAdmin:user.isAdmin,
            attempt:user.attempt,
            token
        }
        return res.status(200).json({user:userData})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.signUp = async(req,res) =>{
    try {
        const {email,name,prn,year,password} = req.body
        const isUserFound = await userModel.findOne({$or:[
            {prn},
            {email}
        ]})
        if(isUserFound)
            return res.status(400).json({message:"User With Email or PRN already Registered"})
        
        const user = await userModel.create({
            name,
            email,
            password,
            prn,
            year,
        })
        const token = generateToken(user._id)
        const userData = {
            name:user.name,
            email:user.email,
            prn:user.prn,
            level:user.level,
            year:user.year,
            isAdmin:user.isAdmin,
            attempt:user.attempt,
            token
        }
        return res.status(201).json({user:userData});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.updateUserLevel = async(req,res) =>{
    try {
        const {_id} = req.user
        const {time} = req.body
        const user = await userModel.findByIdAndUpdate(_id,{
            level:req.body.level,
            time
        },{
            new:true
        })
        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.updateUserAttempt = async(req,res) =>{
    try {
        const {_id} = req.user
        const {attempt} = req.body

        const user = await userModel.findByIdAndUpdate(_id,{attempt},{new:true})

        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getMySelf = async(req,res) =>{
    try {
        const user = req.user;
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getAllUsers = async(req,res) =>{
    try {
        const users = await userModel.find().select("name prn level attempt time")
        return res.status(200).json({users})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}