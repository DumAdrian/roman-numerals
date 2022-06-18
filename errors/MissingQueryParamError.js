class MissingQuerryParamError extends Error {
    constructor(queryParam) {
      let message = `Missing query param '${queryParam}'`;
      super(message);
      this.message = message;
      this.name = "MissingQuerryParamError";
      this.status = 400;
    }
}

module.exports = {
    MissingQuerryParamError
}