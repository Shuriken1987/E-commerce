const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    email: {type: String, required: Boolean},
},{
    timestamps: true
});

const SubscribeModel = mongoose.model("subscribe", subscribeSchema);

module.exports = SubscribeModel;