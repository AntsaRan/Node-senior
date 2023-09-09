const express = require('express');
const config = require('./utils/config');
const dbcon = require('./utils/databaseCon');
const bodyParser = require('body-parser');
const air_nearestRoutes = require('./routes/air_nearest');
const air_ParisRoutes = require('./routes/air_paris');

const db = config.database;

const app = express();

app.use(bodyParser.json());
app.use('/airnearest', air_nearestRoutes);
app.use('/airparis', air_ParisRoutes);

dbcon.connectDb().then(res => {
        const server = app.listen(3000);
}).catch(err => {
    console.log(err);
});

module.exports = app;