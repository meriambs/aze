const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
"mongodb+srv://Firas:OACASxOscV1xCKSR@clusterna1.rasumnu.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("You are connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
