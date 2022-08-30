const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    title: {type: String, required: Boolean},
    description: {type: String, required: Boolean},
    price: {type: Number, required: Boolean},
    category: {type: String},
    rating: {type: Number},
    productImg: {type: String,required: Boolean},
    cloudinary_id: {type: String},
});

const productModel = mongoose.model('product',productSchema);
module.exports = productModel;