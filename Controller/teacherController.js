const TeacherSchema = require("./../Model/teacherModel");
const APIFeatures = require("./../utils/APIFeatures");
const bcrypt = require('bcrypt');
const multer = require("multer");

exports.testonly = (req, res, next) => {
  console.log(req.body);
  next();
};

const multerStorage = multer.diskStorage({
  destination : (req , file , cb)=>{
    cb(null,"photos/teachers/");
  },
  filename : (req , file , cb)=>{
    const ext = file.mimetype.split('/')[1];
    cb(null,`teacher1.jpg`);
  }
});

const multerFilter = (req, file, cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null, true);
  }else{
    cb(new Error("Can upload images only"), false);
  }

};

const upload = multer({
  storage : multerStorage,
  fileFilter : multerFilter
});

exports.uploadPhoto = upload.single("photo");;

exports.getAllTeacher=(req,res,next)=>{

    let api = new APIFeatures(TeacherSchema,req.query).filter().sort().select().paginate();

    api.query.then((data)=>{res.status(200).json(data);});
}


exports.getTeacherById = (req, res, next) => {
    TeacherSchema.findOne({_id:req.params.id}).then((data)=>{res.status(200).json(data);})
    
};
exports.cheackID = (req, res, next, val) => {
    if(!isNaN(val)){
      next();
    }else{
      const error = new Error("Invalid id");
      next(error);
    }
    
};

exports.insert = (req, res, next) => {

   bcrypt.hash(req.body.password, 10).then((data)=> {
    req.body.password = data;
    TeacherSchema.create(req.body).then((data)=>{res.status(200).json({ data: data })}).catch((error) => next(error));
    });

};

exports.update = (req, res, next) => {
    TeacherSchema.findOneAndUpdate({ _id: req.body._id },req.body).then((data)=>{res.status(200).json(data);}).catch((error) => next(error));
};

exports.updatePassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((data)=> {
    req.body.password = data;
    TeacherSchema.findOneAndUpdate({ _id: req.params.id },{"password":req.body.password}).then((data)=>{res.status(200).json(data);}).catch((error) => next(error));
    });
  };

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
