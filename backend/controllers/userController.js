const User = require('../models/user')
const jwt = require('jsonwebtoken')

//generate token
const generateToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}

//signup
const signup = async(req, res) =>{
    const {email, password, name} = req.body

    try{
        const user = await User.signup(email, password, name)

        //create token
        const token = generateToken(user._id)
        res.status(200).json({name, token})

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//login
const login = async(req, res) =>{
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)
        const name = user.name
        const userType = user.user_type
        const token = generateToken(user._id)

        res.status(200). json({name, userType, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signup, login}