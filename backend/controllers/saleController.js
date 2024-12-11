const Sale = require('../models/sale')
const Product = require('../models/product')
const mongoose = require('mongoose')

//Create Sale
const createSale = async(req, res) =>{
    const {sales, total_sale} = req.body
    
    //This needs to be on the mongodb atlass to work
    /*const session = await mongoose.startSession()
        session.startTransaction()

     try{
        if(total_sale <= 0){
            return res.status(400).json({error: "Total sales should not be 0"})
        }

        const updated_sales = []

        for(const item of sales){
            if(!mongoose.Types.ObjectId.isValid(item.product_id)){
                throw new Error(`Invalid product ID: ${item.product_id}`)
            }

            const product = await Product.findById(item.product_id)
            if(!product){
                throw new Error(`No product found with ID: ${item.product_id}`)
            }

            if(product.stock < item.quantity){
                throw new Error(`Insufficient stock for product: ${product.name}`)
            }

            product.stock -= item.quantity
            await product.save({session})

            updated_sales.push({
                product_id: product._id,
                quantity: item.quantity,
                sale_per_item: item.sale_per_item
            })
        }

        const sale = await Sale.create({items:updated_sales, total_sale}, {session})

        if(!sale){
            throw new Error('An error occured. Please try again')
        }

        await session.commitTransaction()
        session.endSession()

        return res.status(200).json(sale)
    }catch(error){
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({error: error.message})
    } */

    if(total_sale <= 0){
        return res.status(400).json({error: "Total sales should not be 0"})
    }

    const updated_sales = []

    for(const item of sales){
        if(!mongoose.Types.ObjectId.isValid(item.product_id)){
            return res.status(400).json({error: `Invalid product ID: ${item.product_id}`})
        }
        
        const product = await Product.findById(item.product_id)
        if(!product){
            return res.status(404).json({error: `No product found with ID: ${item.product_id}`})
        }

        if(product.stock < item.quantity){
            return res.status(500).json({error: `Insufficient stock for product: ${product.name}`})
        }

        product.stock -= item.quantity
        await product.save()

        updated_sales.push({
            product_id: product._id,
            quantity: item.quantity,
            sale_per_item: item.sale_per_item
        })
    }

    const sale = await Sale.create({items:updated_sales, total_sale})

    if(!sale){
        return res.status(500).json({error: 'An error occured. Please try again'})
    }

    return res.status(200).json(sale)
}

//Get all sales
const getSales = async(req, res) =>{
    const sales = await Sale.find({})
    return res.status(200).json(sales)
}

module.exports = {createSale, getSales}