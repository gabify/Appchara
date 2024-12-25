const Product = require('../models/product')
const mongoose = require('mongoose')


//Create Product
const createProduct = async(req, res) =>{
    const {name, price, stock, description} = req.body

    try{
        const product = await Product.create({name, price, stock, description})
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

//Get current stock by product
const getStockByProduct = async(req, res) =>{
    const products = await Product.find({})

    const labels = products.map((product) => product.name)
    const data = products.map((product) => product.stock)
    const backgroundColor = products.map((product) => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`)

    const dataset = {
        labels,
        datasets: [
            {
                label: 'Stock',
                data,
                backgroundColor,
                borderwidth: 1

            }
        ]
    }

    res.status(200).json(dataset)
}

const getCurrentDashboardData = async(req, res) =>{
    const products = await Product.find({})

    const currentStock = products.reduce((acc, current) => acc + current.stock, 0)
    const stockValue = products.reduce((acc, current) => acc + current.stock * current.price, 0)
    //Current Stock in
    //current stock out


    res.status(200).json({currentStock, stockValue})
}

//Update Product
const updateProduct = async(req, res) =>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such product exists"})
    }

    const updated_product = await Product.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if(!updated_product){
        return res.status(404).json({error: "No such product exists"})
    }

    res.status(200).json(updated_product)

}

//ADD STOCK TO PRODUCT
const addStock = async(req, res) =>{
    const {id} = req.params
    const {additional_stock} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such product exists"})
    }

    const updated_product = await Product.updateOne(
        {_id: id}, 
        {$inc: {stock: additional_stock}}
    )

    if(!updated_product){
        return res.status(404).json({error: "No such product exists"})
    }

    res.status(200).json(updated_product)
}

//Delete Product
const deleteProduct = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such product exists"})
    }
    
    const deleted_product = await Product.findOneAndDelete({_id: id})

    if(!deleted_product){
        return res.status(404).json({error: "No such product exists"})
    }

    res.status(200).json(deleted_product)
}

module.exports = {
    createProduct,
    getProducts,
    getStockByProduct,
    getCurrentDashboardData,
    updateProduct,
    addStock,
    deleteProduct,
}