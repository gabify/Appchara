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
        if(!mongoose.Types.ObjectId.isValid(item.product)){
            return res.status(400).json({error: `Invalid product ID: ${item.product}`})
        }
        
        const product = await Product.findById(item.product)
        if(!product){
            return res.status(404).json({error: `No product found with ID: ${item.product}`})
        }

        if(product.stock < item.quantity){
            return res.status(500).json({error: `Insufficient stock for product: ${product.name}`})
        }

        product.stock -= item.quantity
        await product.save()

        updated_sales.push({
            product: product,
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

//Get monthly sales by product
const getMonthlySalesByProduct = async(req, res) =>{
    const {year} = req.params

    if(typeof year === Number){
        res.status(400).json({error: "Invalid year"})
    }

    if(year >= 2100 || year <=1900){
        res.status(400).json({error: "No valid data on that year"})
    }

    const sales = await Sale.aggregate([
        {$unwind: "$items"},

        {
            $lookup:{
                from: 'products',
                localField: 'items.product',
                foreignField: '_id',
                as:"productDetails"
            }
        },
        {$unwind: "$productDetails"},
        {
            $group: {
                _id: {
                    product: '$productDetails.name',
                    month: {$month: '$createdAt'},
                    year: {$year: '$createdAt'}
                },
                totalSales: {$sum: '$items.quantity'}
            }
        },
        {
            $group: {
                _id: "$_id.product",
                monthlyData: {
                    $push: {
                        month: "$_id.month",
                        year: "$_id.year",
                        totalSales: "$totalSales"
                    }
                }
            }
        },
        {
            $project: {
                product: "$_id",
                monthlyData: 1,
                _id: 0
            }
        }

    ])

    const filteredSales = sales.map((sale) =>{
        const monthlyData = sale.monthlyData.filter((entry) => entry.year === parseInt(year))
        sale.monthlyData = monthlyData
        return sale
    })

    const generateRandomColor = (opacity = 1) => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r},${g},${b},${opacity})`;
    };
    

    const transformToChartData = (sales) =>{
        const labels = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];

        const datasets = sales.map((product) =>{
            const data = Array(12).fill(0)

            product.monthlyData.forEach(entry =>{
                data[entry.month -1 ] = entry.totalSales
            })

            return{
                label: product.product,
                data,
                borderColor: generateRandomColor(),
                backgroundColor: 'rgba(34, 166, 179,1.0)'
            }
        })

        return {labels, datasets}
    }
    res.status(200).json(transformToChartData(filteredSales))
}

const getDashboardDataByYear = async(req, res) =>{
    const {year} = req.params

    if(typeof year === Number){
        res.status(400).json({error: "Invalid year"})
    }

    if(year >= 2100 || year <=1900){
        res.status(400).json({error: "No valid data on that year"})
    }

    const sales = await Sale.find({
        createdAt: {$gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-12-31`)}
    })

    let totalSale = 0
    sales.forEach(sale =>{
        const count = sale.items.reduce((acc, current) => acc + current.quantity, 0)
        totalSale += count
    })
    const totalRevenue = sales.reduce((acc, current) => acc + current.total_sale, 0)

    //Total Expense

    //Net Revenue
    
    res.status(200).json({totalSale, totalRevenue})
}

module.exports = {createSale, getSales, getMonthlySalesByProduct, getDashboardDataByYear}