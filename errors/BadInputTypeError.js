class BadInputTypeError extends Error {
    constructor(message) {
      super(message);
      this.name = "BadInputTypeError";
      this.status = 400;
    }
}

module.exports = {
    BadInputTypeError
}