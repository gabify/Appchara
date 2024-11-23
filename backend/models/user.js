const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        required: true,
    }
}, {timestamps: true})

//signup method
userSchema.statics.signup = async function(email, password, name) {
    if(!email || !password || !name){
        throw Error('All fields is required')
    }

    if(!validator.isEmail(email)){
        throw Error('Invalid email. Please use a valid email')
    }
    
    const exists = await this.findOne({email})

    if(exists){
        throw Error('An account has already created using this email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is weak. Please use a strong password')
    }

    const salt = bcrypt.genSaltSync(15)
    const hash = bcrypt.hashSync(password, salt)
    const user_type = 'customer'

    const user = await this.create({email, password: hash, name, user_type})

    return user

}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields is required')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('No account exists with that email')
    }

    if(!bcrypt.compareSync(password, user.password)){
        throw Error('Incorrect password. Please try again')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)