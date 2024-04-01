
const childSchema = require("./../Model/childModel");
const uploadController = require('./uploadController');
const classModel = require("./../Model/classModel");

exports.getAllChild=(req,res,next)=>{
    childSchema.find({})
    .then((data)=>{
        res.status(200).json(data);}).catch((err)=>{next(err)});  
    }



exports.getchildById = (req, res, next) => {
    childSchema.find({_id:req.params.id}).then((data)=>{
        res.status(200).json(data);}).catch((err)=>{next(err)});
};

exports.insert = (req, res, next) => {
    let object = new childSchema(req.body)
    object.save().then((data)=>{
        if (req.file && req.file.buffer){
          childSchema.findOneAndUpdate({ _id: data._id },{image:`${data._id}.${uploadController.extension(req)}`}).then((data)=>{      
            uploadController.saveImage("children",data,req,res,next);}).catch((error) => next(error));
        }
        else 
            res.status(200).json({ data: data });
          
      }).catch((error) => next(error));
};

exports.update = (req, res, next) => {
req.body.image = `${req.body._id}.${uploadController.extension(req)}`;
childSchema.findOneAndUpdate({ _id: req.body._id },req.body).then((data)=>{      
  uploadController.saveImage("children",data,req,res,next);

  }).catch((error) => next(error));

};

exports.supervisors = (req, res, next) => {
res.status(200).json({ data: "supervisors" });
};


exports.deleteByID = (req, res, next) => {
    classModel.updateMany(
        {children: req.params.id}, 
        {$pull: { children: req.params.id }}).catch((error) => next(error));
    
        
        childSchema.findByIdAndDelete(req.params.id).then((data)=>{
            if(data){
              res.status(200).json({status: "success",
              message: "Deleted successfully"})
            }else   
               res.status(404).json({status: "failed",
               message: "this child is not exist"});   
            }).catch((error) => next(error));
   
  
  
  };