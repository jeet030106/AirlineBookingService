const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/index');
const {PORT} = require('./config/server-config');
const {DB_SYNC} = require('./config/server-config');
const db = require('./models/index')

const app = express();
const setUpAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    app.use("/api", router);
}

setUpAndStartServer();