var express = require('express');
var mongoose = require("mongoose");
var Products = require("../models/products");
var Categories = require("../models/categories");
var router = express.Router();

/* GET home page. */
router.route('/').get(function(req, res, next) {
    Products.find(function(err, producto) {
        if (err) res.send(500, err.message);
        console.log(producto);
        Categories.find(function(err, categoria) {
            if (err) res.send(500, err.message);
            console.log(categoria);
            res.render('index', { title: 'Express', datos: producto, categorias: categoria });
        });
    });
});

router.get('/administrador', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.render('iniciarAdministrador', { title: 'Express', usuario: usuario });
    } else {
        var usuario = req.user;
        if (usuario != undefined) {
            usuario = req.user.toJSON();
        }
        res.render('administrador', { tilte: "Express", usuario: usuario });
    }
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});

router.get('/bienvenido', function(req, res, next) {

    if (!req.isAuthenticated()) {
        res.render('login', { title: 'Express' });
    } else {
        var usuario = req.user;
        if (usuario != undefined) {
            usuario = req.user.toJSON();
        }
        res.render('bienvenido', { tilte: "Express", usuario: usuario });
    }
});

module.exports = router;