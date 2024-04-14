const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const pro = require("./routes/pro");
require("dotenv").config();
const morgan = require("morgan");

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api", pro);
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    mongoose.connect(process.env.PRODDB).then(() => {
      console.log("DB is connected");
    });
  } catch (err) {
    console.log(err);
  }
};

connectDB();

const connectApp = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectApp();
