const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID: {type: String, required: Boolean},
    order_date:{type:String},
    order_totalPrice:{type:String},
    order: {type: Array, required: Boolean}

});
const OrderModel = mongoose.model('order', orderSchema);
module.exports = OrderModel;