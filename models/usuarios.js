var baseDatos = require("../config/dbLogin").baseDatos;

var usuarios = baseDatos.Model.extend({
    tableName: 'usuarios_tb',
    idAttribute: 'id',
    name: 'name'
});

module.exports = { usuarios: usuarios }