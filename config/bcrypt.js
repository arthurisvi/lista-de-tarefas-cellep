const bcrypt = require('bcrypt');
const saltRounds = 12; // Número de saltos que o módulo utilizará
const salt = bcrypt.genSaltSync(saltRounds); // Gera um salto aleatório a partir no número predefinido

module.exports = { bcrypt, saltRounds, salt };