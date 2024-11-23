const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)