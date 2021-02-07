const express = require('express')
const router = express.Router()
const StudentController = require('../controller/studentController')

router.get('/',StudentController.read)
router.get('/add',StudentController.getAddForm)
router.post('/add',StudentController.postAdd)
router.get('/:id/edit',StudentController.getEditForm)
router.post('/:id/edit',StudentController.postEdit)
router.get('/:id/delete',StudentController.destroy)

module.exports = router