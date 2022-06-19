const express = require('express');
const router = express.Router();
const intToRoman = require('../services/convertService');
const { MissingQuerryParamError } = require('../errors/MissingQueryParamError')
const { BadInputTypeError } = require('../errors/BadInputTypeError')
const loggingService = require('../services/loggingService.js');
const Prometheus = require('prom-client')

const metricsInterval = Prometheus.collectDefaultMetrics();

const succesfullRequestsTotal = new Prometheus.Counter({
    name: 'requests_total',
    help: 'Total number of succesfull requests',
    labelNames: ['conversion_result']
});

router.get('/romannumeral', (req, res, next) => {
    if ("query" in req.query) {
        var nr = parseInt(req.query.query);
        if (Number.isNaN(nr)) {
            loggingService.info('Input should be a Number!');
            throw new BadInputTypeError('Input should be a Number!');
        }
        let result = intToRoman(nr);
        loggingService.info(`Converted from ${nr} to ${result}`);

        // add metric to prometheus
        succesfullRequestsTotal.inc({
            conversion_result: result
        });

        res.json({result: result});
        next()
      } else {
        loggingService.info(`Missing query param 'query'`);
        throw new MissingQuerryParamError('query');
      }

})

router.get('/metrics', (req, res) => {
    res.set('Content-Type', Prometheus.register.contentType)
    res.end(Prometheus.register.metrics())
});

module.exports = router;