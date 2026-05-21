const {StatusCodes} = require("http-status-codes");

class AppError extends Error {
    constructor(
        name,
        message,
        explaination,
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.name = "Application Error";
        this.message = message;
        this.explaination = explaination;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;