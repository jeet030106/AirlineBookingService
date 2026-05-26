const {StatusCodes} = require('http-status-codes');
const {BookingService} = require('../services/index');

const bookingService = new BookingService();

const createBooking = async (req, res) => {
    try {
        // console.log("Request body in controller: ", req.body);
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message: "Booking created successfully",
            success: true,
            error: {},
            data: response
        });
    } catch (error) {
        console.log("Error in booking controller: ", error); 
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            error: error.explanation
        });
    }
}

module.exports = {
    createBooking
}