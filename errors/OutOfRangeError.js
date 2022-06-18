class OutOfRangeError extends Error {
    constructor(message) {
      super(message);
      this.name = "OutOfRangeError";
      this.status = 400;
    }
}

module.exports = {
    OutOfRangeError
}