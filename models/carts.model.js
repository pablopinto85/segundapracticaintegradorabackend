const mongoose = require("mongoose");

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    
    description: { type: String, max: 30, required: true},
    quantity: { type: Number, required: true},
    total: { type: Number, required: true}
});

module.exports = cartsModel = mongoose.model(cartsCollection, cartsSchema)