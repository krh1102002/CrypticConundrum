const express = require('express')
const isUser = require('../middleware/isUser')
const { createLevel, getAllLevel, deleteLevel,updateLevel } = require('../controllers/Level')

const router = express.Router()

router.post('/create',isUser,createLevel)

router.get('/all',isUser,getAllLevel)

router.delete('/',deleteLevel)

router.put('/',isUser,updateLevel)

module.exports = router