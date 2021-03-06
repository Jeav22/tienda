var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Librerias para passport
var passport = require("passport");
var AdministradorStrategy = require("passport-local").Strategy;
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var TwitterStrategy = require("passport-twitter").Strategy;
var session = require("express-session");
var bcrypt = require("bcrypt-nodejs");
var UsuarioModel = require("./models/usuarios");
var User = require("./models/user")

//Mongoose
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://prueba:prueba@ds141490.mlab.com:41490/loginusa");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

io.on('conection', function () {
    socket.on('disconect', function () {
        console.log("user disconected");
    });
    socket.on("chat message", function (msg) {
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });
});

passport.use(new AdministradorStrategy(
    function (correo, clave, done) {
        process.nextTick(
            function () {
                User.findOne({ 'administrador.name': correo, 'administrador.password': clave },
                    function (err, user) {
                        if (err)
                            return done(err);
                        if (user) {
                            return done(null, user)
                        } else {
                            User.findOne({ 'local.email': correo },
                                function (err, user) {
                                    if (err) {
                                        console.log("errror passport");
                                        return done(err);
                                    }
                                    if (user && bcrypt.compareSync(clave, user.local.password)) {
                                        console.log("si lo encontro local");
                                        return done(null, user)
                                    } else {
                                        console.log("no lo encontro local");
                                        return done("Contraseña invalida");
                                    }
                                }
                            );
                        }
                    }
                );
            }
        );
    }
));

passport.use(
    new FacebookStrategy({
        clientID: '1717389265227129',
        clientSecret: '7d237b229a28c76b80d32326048273dc',
        //callbackURL: "http://localhost:3000/users/auth/facebook/callback",
        callbackURL: "https://tiendaa.herokuapp.com/users/auth/facebook/callback",
        profileFields: ["emails", "displayName"]
    },
        function (token, refreshToken, profile, done) {
            console.log(profile);
            process.nextTick(
                function () {
                    User.findOne({ 'a.id': profile.id },
                        function (err, user) {
                            if (err)
                                return done(err);
                            if (user) {
                                return done(null, user)
                            } else {
                                var newUser = new User();
                                newUser.a.id = profile.id;
                                newUser.a.token = token;
                                newUser.a.name = profile.displayName;
                                newUser.a.email = profile.id;
                                newUser.save(
                                    function (err) {
                                        if (err)
                                            throw err;
                                        return done(null, newUser);
                                    }
                                );
                            }
                        }
                    );
                }
            );
        }
    )
);

passport.use(
    new TwitterStrategy({
        consumerKey: "ZuCiPKymEqn9J7BUeDCo7Ppcf",
        consumerSecret: "OQgHokERod30TzVgZkfqTOxnkoICnwrhU7UyWSnVTVKY8TItge",
    },
        function (token, tokenSecret, profile, done) {
            console.log(profile);
            process.nextTick(
                function () {
                    User.findOne({ 'a.id': profile.id },
                        function (err, user) {
                            if (err)
                                return done(err);
                            if (user) {
                                return done(null, user)
                            } else {
                                var newUser = new User();
                                newUser.a.id = profile.id;
                                newUser.a.token = token;
                                newUser.a.name = profile.displayName;
                                newUser.a.email = profile.id;
                                newUser.save(
                                    function (err) {
                                        if (err)
                                            throw err;
                                        return done(null, newUser);
                                    }
                                );
                            }
                        }
                    );
                }
            );
        }
    ));

passport.serializeUser(
    function (usuario, done) {
        done(null, usuario);
    }
);

passport.deserializeUser(
    function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    },
    function (usuario, done) {
        new UsuarioModel.usuarios({ usuario: usuario }).fetch().then(
            function (usuario) {
                done(null, usuario);
            }
        );
    }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: "Es una frase", cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;