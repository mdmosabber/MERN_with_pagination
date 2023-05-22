const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name:{ 
            type: String,
            require: true,
            trim: true
        },
        code:{ 
            type: String,
            require: true,
            trim: true 
        },
        image: { 
            type: String 
        },
        unitPrice: { 
            type: String 
        },
        qty: {             
            type: String
        },
        totalPrice: { 
            type: String 
        }  
    },
    {timestamps: true, versionKey: false}
)

const Product = mongoose.model('Product', productSchema);
module.exports = Product;