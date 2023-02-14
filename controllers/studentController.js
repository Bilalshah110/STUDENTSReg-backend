require("dotenv").config();
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

//ALL REGISTERED STUDENTS

const all_students = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

//SINGLE REGISTERED STUDENT

const single_student = async (req, res) => {
  try {
    const student = await Student.findById(req.params.userID);
    res.json(student);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

//LOGIN_STUDENT

const login_student = async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(422).send({ result: "Please enter email and password" });
  } else {
    const student = await Student.findOne({ email: email.toLowerCase() });
    if (student) {
      if (student.password === password) {
        const token = jwt.sign({ id: student._id }, SECRET_KEY, {
          expiresIn: "300s",
        });
        res.send({ id: student._id, token });
      } else {
        res.status(401).send({ result: "Incorrect password" });
      }
    } else {
      res.status(401).send({ result: "No student registered with this email" });
    }
  }
};

//REGISTER STUDENT

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
      const studentExist = await Student.findOne({
        email: email.toLowerCase(),
      });
      if (studentExist) {
        return res
          .status(422)
          .send({ error: "Student with this email is already registered" });
      } else {
        const student = new Student(studentData);
        await student.save();
        const token = jwt.sign({ id: student._id }, SECRET_KEY, {
          expiresIn: "300s",
        });
        res.send({ id: student._id, token });
      }
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }
};

//UPDATE STUDENT

const update_student = async (req, res) => {
  const userId = req.params.userID;
  if (userId !== req.user.id) {
    res.status(401).send({
      error: "You are not authorized to delete this student's record",
    });
  } else {
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
        res.status(500).send({ error: "Internal server error" });
      }
    }
  }
};

//REMOVE STUDENT

const remove_student = async (req, res) => {
  const userId = req.params.userID;
  if (userId !== req.user.id) {
    res.status(401).send({
      error: "You are not authorized to delete this student's record",
    });
  } else {
    try {
      const removeStudent = await Student.findByIdAndDelete(req.params.userID);
      if (removeStudent) {
        res.send({ message: `${removeStudent.name} Removed` });
      } else {
        res.status(404).send({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }
};

//VERIFY TOKEN

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, data) => {
      if (err) {
        res.status(401).send({ error: "Invalid/Expired token" });
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(403).send({ error: "Token is missing" });
  }
};

module.exports = {
  all_students,
  login_student,
  single_student,
  add_student,
  update_student,
  remove_student,
  verifyToken,
};
