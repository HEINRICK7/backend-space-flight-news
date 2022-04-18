
const mongoose = require('mongoose')
const dotenv = require('dotenv')

 dotenv.config()
 
const {
    DB_HOSTNAME,
    DB_PORT,
    DB_DATABASE} = process.env

mongoose.connect(
`mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`,
{   
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useNewUrlParser: true 
}) 
.then(() => console.log("MongoDB connected")) 
.catch((err) => console.log(err));

module.exports = mongoose;