const {StatusCodes} = require("http-status-codes");

class ValidationError extends Error {
    constructor(
        explaination=[],
        statusCode=StatusCodes.BAD_REQUEST,
    ){
        super();
        this.name = "Validation Error";
        this.message = "Not able to validate the request body";
        this.explaination = explaination;
        this.statusCode = statusCode;
    }
}

module.exports = ValidationError;