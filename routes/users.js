var express = require('express');
var router = express.Router();

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var AdministradorStrategy = require("passport-local").Strategy;
var session = require("express-session");
var bcrypt = require("bcrypt-nodejs");
var UsuarioModel = require("../models/usuarios");
var modelo = require("../models/user");
var modeloProductos = require("../models/products");
var modeloCategorias = require("../models/categories");
var bodyParse = require("body-parser");
var urlencodedParse = bodyParse.urlencoded({ extended: false });

router.post("/iniciarSesion", urlencodedParse, function(req, res, next) {
    passport.authenticate('local', {
            sucessRedirect: "../bienvenido",
            failureRedirect: "/login"
        },
        function(err, usuario, info) {
            console.log(usuario);
            if (err) {
                return res.render("login", { title: "Express", error: err.message })
            }
            if (!usuario) {
                return res.render("login", { title: "Express", error: info.message + " Error de credenciales" })
            }
            return req.login(usuario, function(err) {
                console.log("whaat")
                if (err) {
                    console.log("error1")
                    return res.render("login", { title: "Express", error: err.message })
                } else {
                    console.log("ooooooooooooooookkkkkkkkkkkkkkk " + usuario.name + usuario.id);
                    res.render('bienvenido', { title: 'Bienvenido', usuario: usuario });
                }
            });
        }
    )(req, res, next);
});

router.post("/signup", function(req, res) {
    var usuario = req.body;
    var usuarioPromise = new UsuarioModel.usuarios({ correo: usuario.correo }).fetch();
    return usuarioPromise.then(
        function(modelo) {
            if (modelo) {
                res.render("login", { tittle: "Registrar usuario", error: "El usuario exisite" });
            } else {
                usuario.clave = bcrypt.hashSync(usuario.clave);
                var modeloUsuario = new UsuarioModel.usuarios({
                    name: usuario.name,
                    apellido: usuario.apellido,
                    correo: usuario.correo,
                    clave: usuario.clave
                });
                modeloUsuario.save().then(function(modelo) {
                    res.render("login", { tittle: "Registrar usuario", error: "El usuario fue creado" });
                });
            }
        }
    );
});

router.post("/crearProducto", function(req, res, next) {
    var producto = req.body;
    var nuevoProducto = new modeloProductos();
    if (producto.available == undefined) {
        producto.available = false;
    }
    if (producto.best_seller == undefined) {
        producto.best_seller = false;
    }
    //nuevoProducto.producto.id = 1;
    nuevoProducto.name = producto.name;
    nuevoProducto.price = producto.price;
    nuevoProducto.available = producto.available;
    nuevoProducto.best_seller = producto.best_seller;
    //nuevoProducto.categories = producto.categories;
    //nuevoProducto.img = producto.img;
    nuevoProducto.description = producto.description;
    nuevoProducto.save(
        function(err) {
            if (err) response.json(error);
            res.redirect('/administrador');
        }
    );
});

router.post("/crearCategoria", function(req, res, next) {
    var categoria = req.body;
    var nuevoCategoria = new modeloCategorias();
    nuevoCategoria.id = categoria.categori_id;
    nuevoCategoria.name = categoria.name;
    nuevoCategoria.save(
        function(err) {
            if (err) response.json(error);
            res.redirect('/administrador');
        }
    );
});

router.post("/iniciarSesionAdministrador", urlencodedParse, function(req, res, next) {
    passport.authenticate('local', {
            sucessRedirect: "../bienvenido",
            failureRedirect: "/login"
        },
        function(err, usuario, info) {
            console.log(usuario + info);
            if (err) {
                return res.render("iniciarAdministrador", { title: "Express", error: err.message + 'aqui' })
            }
            if (!usuario) {
                return res.render("iniciarAdministrador", { title: "Express", error: info.message + " Error de credenciales" })
            }
            return req.login(usuario, function(err) {
                console.log("whaat")
                if (err) {
                    console.log("error1")
                    return res.render("iniciarAdministrador", { title: "Express", error: err.message })
                } else {
                    console.log("ooooooooooooooookkkkkkkkkkkkkkk " + usuario.name + usuario.password);
                    res.render('administrador', { title: 'Bienvenido', usuario: usuario });
                }
            });
        }
    )(req, res, next);
});


router.post("/cerrarSesion", function(req, res) {
    if (!req.isAuthenticated()) {
        request.logout();
    }
});

router.get('/auth/facebook',
    passport.authenticate('facebook')
);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect("/bienvenido");
    });

router.get('/auth/twitter',
    passport.authenticate('twitter')
);

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/bienvenido');
    });

module.exports = router;