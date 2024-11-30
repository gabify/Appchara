const Order = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')
const Sale = require('../models/sale')
const mongoose = require('mongoose')

//Create Order
const createOrder = async(req, res) =>{
    const {userId, orders, total} = req.body

    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({error: "Not a valid user"})
    }
    const valid_user = await User.findById({_id:userId})

    if(!valid_user){
        res.status(400).json({error: `No user found with ID: ${userId}`})
    }

    if(total <= 0){
        return res.status(400).json({error: "Total sales should not be 0"})
    }

    for(const item of orders){
        if(!mongoose.Types.ObjectId.isValid(item.product_id)){
            return res.status(400).json({error: `Invalid product ID: ${item.product_id}`})
        }
        
        const product = await Product.findById(item.product_id)
        if(!product){
            return res.status(404).json({error: `No product found with ID: ${item.product_id}`})
        }

        if(item.quantity <= 0){
            return res.status(400).json({error: "Quantity must be greater than 0"})
        }

        if(product.stock < item.quantity){
            return res.status(500).json({error:`Insufficient stock for product: ${product.name}`})
        }
    }

    const order = await Order.create({user_id: valid_user._id, orders, total, status: "pending"})
    if(!order){
        return res.status(500).json({error: 'An error occured. Please try again'})
    }

    return res.status(200).json(order)

}

//Complete Order
const completeOrder = async(req, res) =>{
    const orderId = req.params

    //check if valid order
    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return res.status(404).json({error: `Invalid order ID: ${orderId}`})
    }
    const order = await User.findById({_id:orderId})

    if(!order){
        res.status(400).json({error: `No order found with ID: ${orderId}`})
    }

    //check if valid user
    if(!mongoose.Types.ObjectId.isValid(order.user_id)){
        return res.status(404).json({error: "Not a valid user"})
    }
    const valid_user = await User.findById({_id:order.user_id})

    if(!valid_user){
        res.status(400).json({error: `No user found with ID: ${order.user_id}`})
    }

    //check if valid total price
    if(total <= 0){
        return res.status(400).json({error: "Total sales should not be 0"})
    }

    const updated_orders = []

    for(const item of order.orders){
        //check each products if valid
        if(!mongoose.Types.ObjectId.isValid(item.product_id)){
            return res.status(400).json({error: `Invalid product ID: ${item.product_id}`})
        }
        
        const product = await Product.findById(item.product_id)
        if(!product){
            return res.status(404).json({error: `No product found with ID: ${item.product_id}`})
        }

        //check if stoc kis enough
        if(product.stock < item.quantity){
            return res.status(500).json({error: `Insufficient stock for product: ${product.name}`})
        }

        //deduct quantity from stock and save
        product.stock -= item.quantity
        await product.save()

        //create new array for the orders
        updated_orders.push({
            product_id: product._id,
            quantity: item.quantity,
            sale_per_item: item.sale_per_item
        })
    }

    //save the sale data 
    const sale = await Sale.create({items:updated_orders, total_sale: total})

    if(!sale){
        return res.status(500).json({error: 'An error occured. Please try again'})
    }

    try{
        //update status of order
        order.status = 'complete'
        await order.save()

        return res.status(200).json(order)
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

//Cancel Order
const cancelOrder = async(req, res) =>{
    const orderId = req.params

    //check if valid order
    if(!mongoose.Types.ObjectId.isValid(orderId)){
        return res.status(404).json({error: `Invalid order ID: ${orderId}`})
    }
    const order = await User.findById({_id:orderId})

    if(!order){
        res.status(400).json({error: `No order found with ID: ${orderId}`})
    }

    try{
        order.status = 'cancelled'
        await order.save()
        return res.status(200).json(order)
    }catch(error){
        return res.status(500).json({error: error.message})
    }

}

//Get all orders
const getOrders = async(req, res) =>{
    const orders = await Order.find({})
    res.status(200).json(orders)
}

//GEt orders by user
const getOrderByUser = async(req, res) =>{
    const userId = req.param

    //check if valid user
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({error: "Not a valid user"})
    }
    const user = await User.findById({_id:userId})

    if(!user){
        res.status(400).json({error: `No user found with ID: ${userId}`})
    }

    const orders = await Order.find({user_id: user._id})

    if(!orders){
        res.status(400).json({error: `No order found with ID: ${orderId}`})
    }

    res.status(200).json(orders)
}



module.exports = {createOrder, getOrders, completeOrder, cancelOrder, getOrderByUser}