const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const user = require('./routes/User')
const level = require('./routes/Level')

const app = express()
app.use(cors())
app.use(express.json())

dotenv.config()

// Database Connection Function
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() =>{
    console.log("Database Connected")
}).catch((error) =>{
    console.log("DataBase Connection Failed"  + error)
})

app.use('/user',user)
app.use('/level',level)

app.listen(4000,() =>{
    console.log("Server Is Running")
})