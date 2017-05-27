var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var categoriesSchema = mongoose.Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('Categories', categoriesSchema);