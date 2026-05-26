const epxress = require("express");

const router = epxress.Router();
const {BookingController} = require("../../controllers/index");

router.post("/bookings", BookingController.createBooking);

module.exports = router;