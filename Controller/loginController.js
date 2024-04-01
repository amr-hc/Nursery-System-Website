const jwt = require('jsonwebtoken');
const TeacherSchema = require("../Model/teacherModel");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const admins = mongoose.connection.collection('admin'); 

exports.login=(req, res, next) => {
    TeacherSchema.findOne({email: req.body.email},{password:1,_id:1}).then((object)=>{
        if (object) {
            bcrypt.compare(req.body.password,object.password).then((result)=>{
                if(result){
                    const token = jwt.sign({
                        id : object._id,
                        role : 'teacher',
                    },process.env.SECRETKEY,
                    {
                        expiresIn:"15hr"
                    });
                    res.status(200).json({data:"Authenticated",token}); 
                }else{
                    throw new Error("Wrong Password");
                }
    
              }).catch((error) => next(error))
          }
        else {

            admins.findOne({email: req.body.email},{password:1,_id:1}).then((object)=>{
                if(object){
                    bcrypt.compare(req.body.password,object.password).then((result)=>{
                        if(result){
                            const token = jwt.sign({
                                id : object.id,
                                role : 'admin',
                            },process.env.SECRETKEY,
                            {
                                expiresIn:"15hr"
                            });
                            res.status(200).json({data:"Authenticated",token}); 
                        }else{
                            throw new Error("Wrong Password");
                        }
            
                      }).catch((error) => next(error))
                }else{
                    next(Error("Email Not Found"));
                }
            });

           
          }

      
            
    }).catch((error) => next(error));
}