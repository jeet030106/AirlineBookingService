const {Bookings} = require('../models/index');
const {StatusCodes} = require("http-status-codes");
const {AppError, ValidationError} = require("../utils/error/index");

class BookingRepository {

    async createBooking(data) {
        try {
            const booking = await Bookings.create(data);
            return booking;
        } catch (error) {
            console.log("Repo Error", error)
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

    async updateBooking(bookingId, data) {
    try {

        await Bookings.update(data, {
            where: {
                id: bookingId
            }
        });

        const booking = await Bookings.findByPk(bookingId);

        return booking;

    } catch (error) {

        console.log("Update Repo Error", error);

        if (error.name === "ValidationError") {
            throw new ValidationError(error);
        }

        throw new AppError(
            "Repository Error",
            "Error while updating the booking in repository layer",
            "Repository Layer Error",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
    }

}

module.exports = BookingRepository;