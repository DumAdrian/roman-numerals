const express = require('express');
const router = express.Router();
const intToRoman = require('../services/convertService');
const { MissingQuerryParamError } = require('../errors/MissingQueryParamError')
const { BadInputTypeError } = require('../errors/BadInputTypeError')
const loggingService = require('../services/loggingService.js');

router.get('/romannumeral', (req, res) => {
    if ("query" in req.query) {
        var nr = parseInt(req.query.query);
        if (Number.isNaN(nr)) {
            loggingService.info('Input should be a Number!');
            throw new BadInputTypeError('Input should be a Number!');
        }
        let result = intToRoman(nr);
        loggingService.info(`Converted from ${nr} to ${result}`);
        res.send(result);
      } else {
        loggingService.info(`Missing query param 'query'`);
        throw new MissingQuerryParamError('query');
      }

})

module.exports = router;