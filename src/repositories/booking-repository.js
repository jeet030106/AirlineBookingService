const {Booking} = require('../models/booking');
const {StatusCodes} = require("http-status-codes");
const {AppError, ValidationError} = require("../utils/index");

class BookingRepository {

    async createBooking(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name === "ValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "Repository Error",
                "Error while creating the booking in repository layer",
                "Repository Layer Error",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepository;