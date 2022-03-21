const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    cartItems: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

const billModel = mongoose.model('Bills', billSchema)

module.exports = billModel