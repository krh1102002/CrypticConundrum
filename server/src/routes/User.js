const express = require('express')
const { signIn, signUp, updateUserLevel, getAllUsers, getMySelf, updateUserAttempt } = require('../controllers/User')
const isUser = require('../middleware/isUser')
const router = express.Router()

router.post('/signIn',signIn)

router.post('/signUp',signUp)

router.get("/me",isUser,getMySelf);

router.put('/update',isUser,updateUserLevel)

router.put("/updateAttempt",isUser,updateUserAttempt);

router.get('/all',getAllUsers)

module.exports = router