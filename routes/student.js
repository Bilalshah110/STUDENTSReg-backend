const studentController = require('../controllers/studentController')
const router = require('express').Router()

router.get('/', studentController.all_students)
router.post('/', studentController.add_student)
router.get('/:userID', studentController.single_student)
router.put('/:userID', studentController.update_student)
router.delete('/:userID', studentController.remove_student)


module.exports = router