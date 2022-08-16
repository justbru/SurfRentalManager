/**
 * connection.js
 * This class is responsible for creating a connection to the 
 *  MongoDB database that we created. This method is called in service.js
 */

const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB connected :%s', con.connection.host);
    }catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB