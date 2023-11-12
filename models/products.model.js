const mongoose = require("mongoose");

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    description: { type: String, max: 100, required: true},
    image: { type: String, max: 100, required: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true}
});

module.exports = productsModel = mongoose.model(productsCollection, productsSchema)