const mongoose = require('mongoose');
const config = require('./config');

const db = config.database;

const connectDb = async () => {
    await mongoose.connect(
        `mongodb+srv://antsa:IqairNode@cluster0.wb4lahp.mongodb.net/${db}?retryWrites=true&w=majority`
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

module.exports =  {connectDb, closeDb} ;
