const express = require('express')
const router = express.Router()
const teachers = require('./teachers')
const students = require('./students')
const subjects = require('./subjects')

router.get('/',(req,res)=>{
    res.render('home')
})

router.use('/teachers',teachers)
router.use('/students',students)
// router.use('/subjects',subjects)


module.exports = router