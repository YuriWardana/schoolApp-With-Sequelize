const { Student } = require('../models/index')

class StudentController{

    static read(req,res){
        Student.findAll({
            order: [['id','ASC']]
        })
        .then(data=> {
            // console.log(data); 
            res.render('students/index',{data:data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static validation(data){
        let warning = []
    
    if (!data.first_name) {
      warning.push(`first name is required`)
    } 

    if (!data.last_name) {
      warning.push(`last name is required`)
    } 

    if (!data.email) {
      warning.push(`email is required`)
    } 

    if (!data.gender) {
      warning.push(`gender is required`)
    }
    

    if (!data.birthdate) {
      warning.push(`birthdate is required`)
    } 
    return warning

    }

    static getAddForm(req,res){
        let alert
        if(req.query.warning){
            alert =  req.query.warning.split(',')
        }
        res.render('students/add',{alert})
    }

    static postAdd(req,res){
        let newStudent = {
            first_name :req.body.first_name,
            last_name :req.body.last_name,
            email :req.body.email,
            gender :req.body.gender,
            birthdate :req.body.birthdate
        }

        let alert = StudentController.validation(newStudent)
        if(alert.length > 0){
            res.redirect(`/students/add?alert =${alert}`)
        }else{
            Student.create(newStudent)
            .then(data=>{res.redirect('/students')})
            .catch(err => { res.send(err)})
        }
    }

    static getEditForm(req,res){
        let id = +req.params.id
        Student.findByPk(id)
        .then(data =>{
            let alert
            console.log(data);
            if(req.query.alert){
                alert = req.body.alert.split(',')
            }
            res.render('students/edit',{data,alert})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static postEdit(req,res){
        let editedData = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            gender : req.body.gender,
            birthdate : req.body.birthdate
        }

        let alert = StudentController.validation(editedData)
        if(alert.length > 0){
            res.redirect(`/students/${+req.params.id}/edit?alert = ${alert}`)
        }
        Student.update(editedData,{
            where:{
                id: +req.params.id
            }
        })
        .then(data=>{res.redirect('/students')})
        .catch(err =>{ res.send(err)})
    }

    static destroy(req,res){
        Student.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {res.redirect('/students')})
        .catch(err =>{res.send(err)})
    }


    
}

module.exports = StudentController