const User = require('../models/user')

//signup
const signup = async(req, res) =>{
    const {email, password, name} = req.body

    try{
        const user = await User.signup(email, password, name)
        res.status(200).json(user)

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//login
const login = async(req, res) =>{
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)
        res.status(200). json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signup, login}