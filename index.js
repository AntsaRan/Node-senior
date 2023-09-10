require('dotenv').config();
const express = require('express');
const config = require('./app/utils/config');
const dbcon = require('./app/utils/databaseCon');
const bodyParser = require('body-parser');
const air_nearestRoutes = require('./app/routes/air_nearest');
const air_ParisRoutes = require('./app/routes/air_paris');

const db = config.database;

const app = express();

app.use(bodyParser.json());
app.use('/airnearest', air_nearestRoutes);
app.use('/airparis', air_ParisRoutes);

dbcon.connectDb().then(res => {
        const server = app.listen(8000);
}).catch(err => {
    console.log(err);
});

module.exports = app;