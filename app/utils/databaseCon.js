const mongoose = require('mongoose');
const config = require('./config');
const mongoURI = process.env.MONGODB_URI;

const db = config.database;

const connectDb = async () => {
    await mongoose.connect(
        mongoURI
    ).then(res => {
        console.log("connected");
        return (true);
    }).catch(err => {
        console.log(err);
    })
}
const closeDb = () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection is disconnected.');
    });
}

module.exports = { connectDb, closeDb };
