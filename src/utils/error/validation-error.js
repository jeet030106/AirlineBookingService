const {StatusCodes} = require("http-status-codes");

class ValidationError extends Error {
    constructor(
        error
    ){
        super();
        let explaination = []
        error.errors.forEach((err) => {
            explaination.push(err.message);
        });
        this.name = "Validation Error";
        this.message = "Not able to validate the request body";
        this.explaination = explaination;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;