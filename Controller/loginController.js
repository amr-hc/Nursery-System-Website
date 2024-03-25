const jwt = require('jsonwebtoken');
const TeacherSchema = require("../Model/teacherModel");

exports.login=(req, res, next) => {
    TeacherSchema.findOne({email: req.body.email,password: req.body.password}).then((object)=>{
        if (!object) {
            throw new Error("Not Authenticated");
          }
      
            const token = jwt.sign({
                id : object.id,
                role : object.role
            },process.env.SECRETKEY,
            {
                expiresIn:"15hr"
            });
            res.status(200).json({data:"Authenticated",token}); 
    }).catch((error) => next(error));
}