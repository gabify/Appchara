const mongoose = require('mongoose')

const Schema = mongoose.Schema

const saleSchema = Schema({
    items: {
        type: [
            {
                product_id: {
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
            },
        ],
        required: true
    },
    total_sale: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Sale', saleSchema)