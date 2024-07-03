const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURI = "mongodb://0.0.0.0/iNotebook"
const mongoURI = process.env.MONGO_URL

const connectToMongo = ()=> {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB Successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = connectToMongo;