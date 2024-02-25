const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

// const URI = "mongodb://127.0.0.1:27017/mern_admin_pannel";
// mongoose.connect(URI);

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection successfull to DataBase")
    }catch (error) {
        console.error("database connection failed");
        process.exit(0);
    }
};

module.exports = connectDb;