const studentController = require("../controllers/studentController");
const router = require("express").Router();
const verifyToken = studentController.verifyToken;

router.get("/", verifyToken, studentController.all_students);
router.post("/login", studentController.login_student);
router.post("/", studentController.add_student);
router.get("/:userID", verifyToken, studentController.single_student);
router.put("/:userID", verifyToken, studentController.update_student);
router.delete("/:userID", verifyToken, studentController.remove_student);

module.exports = router;
