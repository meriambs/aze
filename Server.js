const express = require("express");
var cors = require("cors");
const connectDB = require("./Config/ConnectDB");
const ContactRouter = require("./Routes/Contact");
const BlogRouter = require("./Routes/Blog");

const app = express();
const port = 5004;

app.use(express.json());
app.use(cors());
require("dotenv").config();

connectDB();

//route contact
app.use("/api/contact", ContactRouter);
//route blogs
app.use("/api/blog", BlogRouter);

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`go to ${port}`);
});
