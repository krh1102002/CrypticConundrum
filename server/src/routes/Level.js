const express = require('express')
const isUser = require('../middleware/isUser')
const { createLevel, getAllLevel, deleteLevel } = require('../controllers/Level')
const { updateLevel } = require('../controllers/User')

const router = express.Router()

router.post('/create',isUser,createLevel)

router.get('/all',isUser,getAllLevel)

router.delete('/',deleteLevel)

router.put('/',updateLevel)

module.exports = router