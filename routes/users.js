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

router.post("/iniciarSesion", urlencodedParse, function (req, res, next) {
    passport.authenticate('local', {
        sucessRedirect: "../bienvenido",
        failureRedirect: "/login"
    },
        function (err, usuario, info) {
            console.log(usuario);
            if (err) {
                console.log("error");
                modeloCategorias.find(function (errr, categoria) {
                    if (errr) res.send(500, errr.message);
                    console.log(categoria);
                    return res.render("login", { title: "Express", error: err.message, categorias: categoria })
                });
            }
            if (!usuario) {
                console.log("no es un usuario");
                modeloCategorias.find(function (errr, categoria) {
                    if (errr) res.send(500, errr.message);
                    console.log(categoria);
                    return res.render("login", { title: "Express", error: info.message = " Error de credenciales...", categorias: categoria })
                });
            }
            return req.login(usuario, function (err) {
                console.log("whaat")
                if (err) {
                    console.log("error1")
                    modeloCategorias.find(function (errr, categoria) {
                        if (errr) res.send(500, errr.message);
                        console.log(categoria);
                        return res.render("login", { title: "Express", error: err.message, categorias: categoria })
                    });
                } else {
                    console.log("ooooooooooooooookkkkkkkkkkkkkkk ");
                    modeloProductos.find(function (errr, producto) {
                        if (errr) res.send(500, errr.message);
                        console.log(producto);
                        modeloCategorias.find(function (errr, categoria) {
                            if (errr) res.send(500, errr.message);
                            console.log(categoria);
                            res.render('bienvenido', { title: 'Bienvenido', usuario: usuario.local, datos: producto, categorias: categoria });
                        });
                    });
                }
            });
        }
    )(req, res, next);
});

router.post("/signup", function (req, res) {
    var usuario = req.body;
    usuario.password = bcrypt.hashSync(usuario.password);

    modelo.findOne({ 'local.email': usuario.email },
        function (err, user) {
            if (err)
                modeloCategorias.find(function (errr, categoria) {
                    if (errr) res.send(500, errr.message);
                    console.log(categoria);
                    res.render("login", { tittle: "Registrar usuario", error: err.message, categorias: categoria });
                });
            if (user) {
                modeloCategorias.find(function (errr, categoria) {
                    if (errr) res.send(500, errr.message);
                    console.log(categoria);
                    res.render("login", { tittle: "Registrar usuario", error: "El usuario exisite", categorias: categoria });
                });
            } else {
                var newUser = new modelo();
                newUser.local.password = usuario.password;
                newUser.local.name = usuario.name;
                newUser.local.email = usuario.email;
                newUser.save(
                    function (err) {
                        if (err)
                            throw err;
                        modeloCategorias.find(function (errr, categoria) {
                            if (errr) res.send(500, errr.message);
                            console.log(categoria);
                            res.render("login", { tittle: "Registrar usuario", error: "El usuario fue creado", categorias: categoria });

                        });
                    }
                );
            }
        }
    );
});

router.post("/crearProducto", function (req, res, next) {
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
    nuevoProducto.img = producto.img;
    nuevoProducto.description = producto.description;
    nuevoProducto.save(
        function (err) {
            if (err) response.json(error);
            modeloProductos.find(function (errr, producto) {
                if (errr) res.send(500, errr.message);
                console.log(producto);
                modeloCategorias.find(function (errr, categoria) {
                    if (errr) res.send(500, errr.message);
                    console.log(categoria);
                    res.render('administrador', { usuario: categoria.usuario, datos: producto, categorias: categoria });
                });
            });
        }
    );
});

router.post("/crearCategoria", function (req, res, next) {
    var categoria = req.body;
    var nuevoCategoria = new modeloCategorias();
    nuevoCategoria.id = categoria.categori_id;
    nuevoCategoria.name = categoria.name;
    nuevoCategoria.save(
        function (err) {
            if (err) response.json(error);
            modeloProductos.find(function (errr, producto) {
                if (errr) res.send(500, errr.message);
                console.log(producto);
                modeloCategorias.find(function (errr, categoria) {
                    if (errr) res.send(500, errr.message);
                    console.log(categoria);
                    res.render('administrador', { usuario: categoria.usuario, datos: producto, categorias: categoria });
                });
            });
        }
    );
});

router.post("/SesionAdministrador", urlencodedParse, function (req, res, next) {
    passport.authenticate('local', {
        sucessRedirect: "../bienvenido",
        failureRedirect: "/login"
    },
        function (err, usuario, info) {
            console.log(usuario + info);
            if (err) {
                modeloCategorias.find(function (errr, categoria) {
                    if (errr) res.send(500, errr.message);
                    console.log(categoria);
                    return res.render("iniciarAdministrador", { title: "Express", error: 'El usuario no existe', categorias: categoria });
                });
            }
            if (!usuario) {
                modeloCategorias.find(function (errr, categoria) {
                    if (errr) res.send(500, errr.message);
                    console.log(categoria);
                    return res.render("iniciarAdministrador", { title: "Express", error: 'error', categorias: categoria });
                });
            }
            return req.login(usuario, function (err) {
                console.log("whaat admin")
                if (err) {
                    console.log("error1 admin");
                    modeloCategorias.find(function (errr, categoria) {
                        if (errr) res.send(500, errr.message);
                        console.log(categoria);
                        return res.render("iniciarAdministrador", { title: "Express", error: err.message, categorias: categoria });
                    });
                } else {
                    console.log("ooooooooooooooookkkkkkkkkkkkkkk admin");
                    modeloProductos.find(function (errr, producto) {
                        if (errr) res.send(500, errr.message);
                        console.log(producto);
                        modeloCategorias.find(function (errr, categoria) {
                            if (errr) res.send(500, errr.message);
                            console.log(categoria);
                            res.render('administrador', { title: 'Bienvenido', usuario: usuario, datos: producto, categorias: categoria });
                        });
                    });
                }
            });
        }
    )(req, res, next);
});


router.post("/cerrarSesion", function (req, res) {
    if (!req.isAuthenticated()) {
        request.logout();
    }
});

router.get('/auth/facebook',
    passport.authenticate('facebook')
);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect("/bienvenido");
    });

router.get('/auth/twitter',
    passport.authenticate('twitter')
);

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/bienvenido');
    });

module.exports = router;