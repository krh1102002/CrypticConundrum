const express = require('express')
const { signIn, signUp, updateLevel, getAllUsers } = require('../controllers/User')
const isUser = require('../middleware/isUser')
const router = express.Router()

router.post('/signIn',signIn)

router.post('/signUp',signUp)

router.put('/update',isUser,updateLevel)

router.get('/all',getAllUsers)

module.exports = router