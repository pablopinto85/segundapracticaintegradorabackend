const mongoose = require("mongoose");

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
    user: { type: String, max: 100, required: true},
    message: { type: String, max: 100, required: true},
});

module.exports = messagesModel = mongoose.model(messagesCollection, messagesSchema)