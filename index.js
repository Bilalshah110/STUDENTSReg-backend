require("dotenv").config();
const express = require("express");
require("./db");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 1111;
const studentRoutes = require("./routes/student");
app.use(studentRoutes);

//Connecting to server
app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});
