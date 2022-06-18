const express = require('express')
const app = express()
const routes = require('./routes');
const loggingService = require('./services/loggingService.js');
const createError = require('http-errors');

app.use(routes);


// bad route handling
app.use(function (req, res, next) {
    return next(new createError(404, `Route ${req.path} not found`));
});

app.use(function (err, req, res, next) {

    loggingService.error(err.stack);

    res.status(err.status || 500);

    return res.jsonp({
        status: err.status || 500,
        message: err.message,
        errorType: err.name
    });

});

module.exports = app;