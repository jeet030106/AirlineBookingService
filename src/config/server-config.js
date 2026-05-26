const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_SYNC: process.env.DB_SYNC,
    FLIGHTSEARCH: process.env.FLIGHTSEARCH
};