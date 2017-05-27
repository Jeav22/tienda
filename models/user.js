var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({
    local: {
        id: String,
        name: String,
        email: String,
        password: String,
    },
    a: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    administrador: {
        name: String,
        password: String
    },
    categoria: {
        id: String,
        name: String
    },
    producto: {
        id: Number,
        name: String,
        price: Number,
        available: Boolean,
        best_seller: Boolean,
        categories: { id: String },
        img: String,
        description: String
    }

});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.hashPassword = function(password) {
    var user = this;
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err)
            return next(err);
        user.local.password = hash;
    });
};

module.exports = mongoose.model('User', userSchema);