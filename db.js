const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
module.exports = mongoose
  .connect(
    "mongodb://localhost:27017/studentReg",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("Connected to database successfully"))
  .catch((error) => console.log(error.message));

  // .connect(
  //   process.env.DB_CONNECTION,
  //   { useUnifiedTopology: true, useNewUrlParser: true }
  // )
