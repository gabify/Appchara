const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orders: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true
                },
                sale_per_item: {
                    type: Number,
                    required: true,
                },
            }
        ],
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)