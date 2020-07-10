'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../controles/config');

exports.ensureAuthenticated = function(req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Error" });
    }

    var token = req.headers.authorization.split(" ")[0];
    var playload = jwt.decode(token, config.TOKEN_SECRET);

    if (playload.exp <= moment().unix()) {
        return res
            .status(401)
            .send({ message: "Token Expiro" });
    }

    req.user = playload.sub;
    next();
}