'use strict'

//cargamos la libreria de jwt
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../Controles/config');

//exportamos el modulo 
exports.createToken = function(user) {
    var playload = {
        sub: user._id,
        iat: moment().unix,
        exp: moment().add(14, 'days').unix
    };
    return jwt.encode(playload, config.TOKEN_SECRET);
}