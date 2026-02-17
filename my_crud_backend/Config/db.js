
const mongoose = require("mongoose");

const connectionDB = async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
       
        console.log("MongoDB Connected to DB:", mongoose.connection.name);

    }
    catch(error){
        console.error("mongodb connection fail",error.message);
        process.exit(1);
    }

};

module.exports = connectionDB;