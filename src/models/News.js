const mongoose = require('../database')

const ResultSchema = new mongoose.Schema({
     
    id:{
        type: Number,
        require: true,
    },
    featured: {
        type: Boolean,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
    },
    newsSite: {
        type: String,
        require: true,
    },
    summary: {
        type: String,
        require: true,
    },
    publishedAt:{
        type: Date,
    },
    launches: {
        type: Array,
    },
      
    events:{
        type: Array,
    }
});
const Result= mongoose.model('Result', ResultSchema);

module.exports = Result
