const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    }, 
    rating : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

const feed = mongoose.model('feedback', FeedbackSchema); 

module.exports = feed;