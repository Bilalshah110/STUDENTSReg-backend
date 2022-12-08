const Student = require("../models/Student");

const all_students = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.json({ Error: error });
  }
};

const single_student = async (req, res) => {
  try {
    const student = await Student.findById(req.params.userID);
    res.json(student);
  } catch (error) {
    res.json({ Error: error });
  }
};
const add_student = async (req, res) => {
  const { name, email, password, cpassword, phone, dob, city } = req.body;
  if ((!name, !email, !password, !cpassword, !phone, !dob, !city)) {
    return res.status(422).send({ error: "Please fill all the fields" });
  } else {
    const studentData = {
      name,
      email: email.toLowerCase(),
      password,
      cpassword,
      phone,
      dob,
      city,
    };
    try {
      const userExist = await Student.findOne({ email: email.toLowerCase() });
      if (userExist) {
        return res
          .status(422)
          .send({ error: "Student with this email is already registered" });
      } else {
        const student = new Student(studentData);
        const addStudent = await student.save();
        res.send(addStudent);
      }
    } catch (error) {
      res.json({ Error: error });
    }
  }
};
const update_student = async (req, res) => {
  const { name, email, password, cpassword, phone, dob, city } = req.body;
  if ((!name, !email, !password, !cpassword, !phone, !dob, !city)) {
    return res.status(422).send({ error: "Please fill all the fields" });
  } else {
    const studentData = {
      name,
      email: email.toLowerCase(),
      password,
      cpassword,
      phone,
      dob,
      city,
    };
    try {
      const editFormData = await Student.findById(req.params.userID);
      const studentExist = await Student.findOne({
        email: email.toLowerCase(),
      });
      if (studentExist && studentExist.email !== editFormData.email) {
        return res
          .status(422)
          .send({ error: "Student with this email is already registered" });
      } else {
        const updateStudent = await Student.findByIdAndUpdate(
          req.params.userID,
          studentData
        );
        res.send(`${updateStudent.name} Updated`);
      }
    } catch (error) {
      res.json({ Error: error });
    }
  }
};

const remove_student = async (req, res) => {
  try {
    const removeStudent = await Student.findByIdAndDelete(req.params.userID);
    res.send(`${removeStudent.name} Removed`);
  } catch (error) {
    res.json({ Error: error });
  }
};

module.exports = {
  all_students,
  single_student,
  add_student,
  update_student,
  remove_student,
};
