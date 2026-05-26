const {BookingRepository} = require('../repositories/index')
const {FLIGHTSEARCH} = require('../config/server-config');
const axios = require('axios');
const {ServiceError} = require("../utils/error/index");
const {StatusCodes} = require("http-status-codes");

class BookingService {

    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId= data.flightId;
            const response = await axios.get(`${FLIGHTSEARCH}/api/v1/flight/${flightId}`);
            const flightDetails = response.data.data;
            if(data.noOfSeats > flightDetails.totalSeats) {
                throw new ServiceError(
                    "Booking Error",
                    "Not enough seats available",
                    StatusCodes.BAD_REQUEST
                );
            }
            let priceOfFlight= flightDetails.price;
            const totalCost = priceOfFlight * data.noOfSeats;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.createBooking(bookingPayload);
            console.log("Before patch");

            const patchResponse = await axios.patch(
                `${FLIGHTSEARCH}/api/v1/flight/${flightId}`,
                {
                    totalSeats: flightDetails.totalSeats - data.noOfSeats
                }
            );

            console.log("Patch Response", patchResponse.data);

            console.log("Before final booking update"); 
            const finalBooking = await this.bookingRepository.updateBooking(booking.id, {status: "Booked"});
            return finalBooking;
        } catch (error) {
            console.log("Service Layer error", error)
            if(error.name === "ValidationError" || error.name==="Repository Error") {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;