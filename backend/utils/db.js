const mongoose = require("mongoose");

let isConnected = false;


async function connectDB() {

  if (isConnected) {
    return;
  }


  try {

    const connection =
      await mongoose.connect(
        process.env.MONGODB_URI
      );


    isConnected = true;


    console.log(
      "MongoDB connected:",
      connection.connection.host
    );


  } catch (error) {

    console.error(
      "MongoDB connection error:",
      error
    );

    throw error;

  }

}


module.exports = connectDB;