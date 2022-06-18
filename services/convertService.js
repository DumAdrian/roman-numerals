const constants = require('../lib');
const loggingService = require('./loggingService.js');

const { OutOfRangeError } = require('../errors/OutOfRangeError.js')

/**
 * @param {number} nr
 * @return {string} conversion of nr to roman numerals
 */
 var intToRomanService = function(nr) {
    if (nr <= 0 || nr > 2200000000) {
        loggingService.info(`Number ${nr} not in range 1 - 2200000000`);
        throw new OutOfRangeError(`Number ${nr} not in range 1 - 2200000000`);
    }

    let roman = '';
    let overlines = 0;

    // this will always end since we can just add 'I' Character to fill the smallest gaps possible (integers -> smallest increment = 1)
    while (nr > 0) {
        // establish the range for the current remaining part of the number
        overlines = getRange(nr);

        // this flag ensures we will use only the highest numeral which matches for the current iteration
        // e.g. 23000 would lead to X̅X̅IXIXIXIX.... since after reaching X character (and converting it to X̅) it will only try to use smaller numerals like IX
        let found = false;
        for (let [key, value] of Object.entries(constants.no2Roman)) {
            // each overline means 3 extra 0s after the number it represents
            let val = value * Math.pow(1000, overlines);

            while (nr >= val) {
                // we got a match for the final solution
                found = true;

                var result = '';
    
                // add overlines above every letter, for example IX needs 2 overlines
                key.split('').map(letter => {
                    result += letter + constants.overlineEnc[overlines];
                });
                
                roman = roman + result;
                nr = nr - val;
            }
            // this prevents the output to try higher values with fewer overlines C vs X̅
            if (found) {
                break;
            }
        }
    }
    
    loggingService.info(`Conversion succesfull with result ${roman}`);
    return roman
};

/**
 * @param {number} nr
 * @return {number} number of overlines
 */
var getRange = function(nr) {
    if (nr < 4000) {
        return 0;
    } else if (4000 <= nr && nr < 4000000) {
        return 1;
    } else if (nr >= 4000000) {
        return 2;
    }
}

module.exports = intToRomanService;