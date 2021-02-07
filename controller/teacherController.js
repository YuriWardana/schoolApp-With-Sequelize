const { Teacher } = require ('../models/index')

class TeacherController{

    static read(req,res){
        Teacher.findAll({
            order:[['id','asc']]
        })
        .then(data=>{res.render('teacher/index',{data})})
        .catch(err=>{res.send(err)})
    }

    static getAddForm(req,res){
        res.render('teacher/add')
    }

    static postAdd(req,res){
        let newteacher = {
            first_name : req.body.first_name,
            last_name :req.body.last_name,
            email :req.body.email,
            gender : req.body.gender
        }
        Teacher.create(newteacher)
        .then(data=>{ res.redirect('/teachers')})
        .catch(err=>{res.send(err.stack)})
    }

    static destroy(req,res){
        Teacher.destroy({
            where:{
                id: +req.params.id
            }
        })
        .then(data=>{ res.redirect('/teachers')})
        .catch(err =>{res.send(err)})
    }

    static getEditForm(req,res){
        let id = +req.params.id
        Teacher.findByPk(id)
        .then(data=>{res.render('teacher/edit',{data})})
        .catch(err=>{res.send(err)})
    }

    static postEdit(req,res){
        let newTeacher = {
            first_name : req.body.first_name,
            last_name :req.body.last_name,
            email :req.body.email,
            gender : req.body.gender
        }
        Teacher.update(newTeacher,{
            where:{
                id:+req.params.id
            }
        })
        .then(data=>{res.redirect('/teachers')})
        .catch(err=>{res.send(err)})
    }
 
} 

module.exports = TeacherController