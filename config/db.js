const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        console.log(process.env.MONGODB_URL)
        const conn = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDb;
