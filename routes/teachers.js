const express = require('express')
const router = express.Router()

const TeacherController = require('../controller/teacherController')


router.get('/',TeacherController.read)
router.get('/add',TeacherController.getAddForm)
router.post('/add',TeacherController.postAdd)
router.get('/:id/edit',TeacherController.getEditForm)
router.post('/:id/edit',TeacherController.postEdit)
router.get('/:id/delete',TeacherController.destroy)

module.exports = router