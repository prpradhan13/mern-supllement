import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
   products: [
        {
            type: String,
            ref: 'Product',
        },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancel']
    },
}, {timestamps: true})

export default mongoose.model('Order', orderSchema);