var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var productsSchema = mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    available: Boolean,
    best_seller: Boolean,
    categories: { id: String },
    img: String,
    description: String
});

module.exports = mongoose.model('Products', productsSchema);