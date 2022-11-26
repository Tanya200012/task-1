const express = require("express");
const mongoose = require("mongoose")
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute")
app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.MongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    console.log("server and database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", authRoute);
  