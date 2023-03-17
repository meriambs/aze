const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 4,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      min: 4,
      max: 30,
    },
    pseudo: {
      type: String,
      required: true,
      max: 10,
    },
    // picturePath: {
    //   type: String,
    //   default: "",
    // },
    age: Number,
    CIN: Number,
    government: String,
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 30,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user"
    },
    // blogs: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Blog",
    //     required: true,
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactsList", ContactSchema);
