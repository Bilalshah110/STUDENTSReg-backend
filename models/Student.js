const { Schema, model } = require("mongoose");
const studentSchema = new Schema({
  name: String,
  email: String,
  password: String,
  cpassword: String,
  phone: Number,
  dob: String,
  city: String,
});

module.exports = model("Student", studentSchema);
