require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 1111;

const connectDB = mongoose
  .connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("Connected to database successfully"))
  .catch((error) => console.log(error.message));

const studentRoutes = require("./routes/student");
app.use(studentRoutes);

//Connecting to server
if (connectDB){
  app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
  });
}
