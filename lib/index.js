var no2Roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
}

var overlineEnc = {
    0: '',       // no overlines
    1: '\u0305', // 1 ooverline
    2: '\u033f'  // 2 overlines
}

module.exports = Object.freeze({
    no2Roman,
    overlineEnc
  });