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
<<<<<<< HEAD
    },
    categoria: {
        id: String,
        name: String
    },
    producto: {
        id: String,
        name: String,
        available: String,
        best_seller: String,
        categories: String,
        img: String,
        description: String
=======
>>>>>>> c82edb9a821c1da33f630e75d3f30f60d7a1e4a9
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