require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const productRoutes = require('./routes/productRoutes')
const app = express()

//cors enabled endpoints
let corsOptions = {
    origin: 'http://localhost:3000'
}

//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

mongoose.connect(process.env.DB_URI)
    .then(() =>{
        app.listen(process.env.PORT, ()=>{
            console.log('Connected to database...')
            console.log('Listening to port ', process.env.PORT)
        })
    }).catch(error =>{
        console.log(error)
    })


let requestMapper = '/api/v1'
app.use(requestMapper+'/product', productRoutes)


//if no request match
app.use((req, res) =>{
    res.status(404).json({error: "No such method exist"})
})