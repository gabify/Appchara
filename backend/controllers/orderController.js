const Order = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')
const mongoose = require('mongoose')

//Create Order
const createOrder = async(req, res) =>{
    const {userId, productId, quantity} = req.body

    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({error: "Not a valid user"})
    }

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(404).json({error: "Not valid product"})
    }

    const user_id = new mongoose.Types.ObjectId(userId)
    const product_id = new mongoose.Types.ObjectId(productId)

    const valid_user = await User.findOne({_id: user_id})

    if(!valid_user){
        res.status(400).json({error: "No such user exists"})
    }

    const valid_product = await Product.findOne({_id: product_id})

    if(!valid_product){
        res.status(400).json({error: "No such product exists"})
    }

    try{
        const order = await Order.create({user_id, product_id, quantity, status: "pending"})
        res.status(200).json(order)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

//Get all orders
const getOrders = async(req, res) =>{
    const orders = await Order.find({})
    res.status(200).json(orders)
}


module.exports = {createOrder, getOrders}