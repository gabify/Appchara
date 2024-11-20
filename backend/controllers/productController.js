const Product = require('../models/product')
const mongoose = require('mongoose')


//Create Product
const createProduct = async(req, res) =>{
    const {name, price, description} = req.body

    try{
        const product = await Product.create({name, price, description})
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({error: err})
    }
}

//Get all Products
const getProducts = async(req, res) =>{
    const products = await Product.find({})
    res.status(200).json(products)
}

//Update Product

//Delete Product

module.exports = {
    createProduct,
    getProducts
}