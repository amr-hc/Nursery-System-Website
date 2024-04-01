const TeacherSchema = require("./../Model/teacherModel");
const classModel = require("./../Model/classModel");
const bcrypt = require('bcrypt');
const uploadController = require('./uploadController');






exports.getAllTeacher=(req,res,next)=>{

  TeacherSchema.find({}).then((data)=>{res.status(200).json({status: "success",data: data,});}).catch((err) => {next(err);});
}


exports.getTeacherById = (req, res, next) => {
    TeacherSchema.findOne({_id:req.params.id}).then((data)=>{res.status(200).json({status: "success",data: data,});}).catch((err) => {next(err);});
    
};




exports.insert = (req, res, next) => {
  req.body.image = "default.jpg";
   bcrypt.hash(req.body.password, 10).then((data)=> {
    req.body.password = data;
    TeacherSchema.create(req.body).then((data)=>{
      if (req.file){
        TeacherSchema.findOneAndUpdate({ _id: data._id },{image:`${data._id}.${uploadController.extension(req)}`}).then((data)=>{      
          uploadController.saveImage("teachers",data,req,res,next);}).catch((error) => next(error));
      }
      else 
          res.status(200).json({status: "success"});
        
    }).catch((error) => next(error));
    });

};



exports.update = (req, res, next) => {
    req.body.image = `${req.body._id}.${uploadController.extension(req)}`;
    TeacherSchema.findOneAndUpdate({ _id: req.body._id },req.body).then((data)=>{      
      uploadController.saveImage("teachers",data,req,res,next);

      }).catch((error) => next(error));

};



exports.updatePassword = (req, res, next) => {
  

  bcrypt.hash(req.body.newPassword, 10).then((hash)=> {
   
    if(req.token.role=="admin"){

      TeacherSchema.findOneAndUpdate({ email: req.body.email },{"password":hash}).then((data)=>{res.status(200).json({status: "success",
      message: "chaneged password successfully"});}).catch((error) => next(error));

    }else{
      TeacherSchema.findOne({email: req.body.email},{password:1}).then((data)=>{
        
        bcrypt.compare(req.body.password,data.password).then((result)=>{
          if(result){
            TeacherSchema.findOneAndUpdate({ email: req.body.email },{"password":hash}).then((data)=>{res.status(200).json({data:"changed password Successful"});}).catch((error) => next(error));
          }else{
              throw new Error("Wrong Password");
          }

        }).catch((error) => next(error))
      });

    }
  
  }).catch((error) => next(error));


  }


exports.supervisors = (req, res, next) => {
    TeacherSchema.aggregate([
        {
          $lookup: {
            from: "classes",
            localField: "_id",
            foreignField: "supervisor",
            as: "class_supervise"
          }
        },
        {
          $match: {
            class_supervise: { $ne: [] } 
          }
        },
        {
            $project: {
            _id: 1,
            fullname: 1,
            email: 1,
            password: 1,
            image: 1
        }
        }]).then((data)=>{res.status(200).json(data)}).catch((error) => next(error))
};


exports.deleteByID = (req, res, next) => {
  classModel.findOne({supervisor: req.params.id}).then((data)=>{
    if(data){
      res.status(400).json({data:"Can't delete this user because this user supervisor class"})
    }else{
      TeacherSchema.findByIdAndDelete(req.params.id).then((data)=>{
        if(data){
          res.status(200).json({status: "success",
          message: "Deleted successfully"})
        }else   
           res.status(404).json({status: "failed",
           message: "this user is not exist"});   
        }).catch((error) => next(error));

    }
  })


};