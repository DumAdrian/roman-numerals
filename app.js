const express = require('express')
const app = express()

const Prometheus = require('prom-client')
const routes = require('./routes');
const loggingService = require('./services/loggingService.js');
const createError = require('http-errors');

// metrics/monitoring histogram
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
});

// Runs before each requests
app.use((req, res, next) => {
    res.locals.startEpoch = Date.now()
    next()
});
app.use(routes);

// Runs after each requests
app.use((req, res, next) => {
    if (!req.route) {
        next()
    }

    const responseTimeInMs = Date.now() - res.locals.startEpoch
  
    httpRequestDurationMicroseconds
      .labels(req.method, req.route.path, res.statusCode)
      .observe(responseTimeInMs)
});

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
