const jwt = require('jsonwebtoken');
const TeacherSchema = require("../Model/teacherModel");
const bcrypt = require('bcrypt');

exports.login=(req, res, next) => {
    TeacherSchema.findOne({email: req.body.email},{password:1,_id:1,role:1}).then((object)=>{
        if (!object) {
            throw new Error("Email Not Found");
          }
        
          bcrypt.compare(req.body.password,object.password).then((result)=>{
            if(result){
                const token = jwt.sign({
                    id : object.id,
                    role : object.role
                },process.env.SECRETKEY,
                {
                    expiresIn:"15hr"
                });
                res.status(200).json({data:"Authenticated",token}); 
            }else{
                throw new Error("Wrong Password");
            }

          }).catch((error) => next(error))
      
            
    }).catch((error) => next(error));
}