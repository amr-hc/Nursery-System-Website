
const classSchema = require("./../Model/classModel");


const TeacherSchema = require("./../Model/teacherModel");
const childSchema = require("./../Model/childModel");


exports.getAllclass=(req,res,next)=>{
    classSchema.find({})
    .populate({ path: "supervisor", select:{fullname:1}})
    .populate({ path: "children", select:{fullname:1}})
    .then((data)=>{
        res.status(200).json(data);}).catch((err)=>{next(err)});  
}


exports.getclassById = (req, res, next) => {
    classSchema.find({_id:req.params.id}).populate({ path: "supervisor", select:{fullname:1}}).populate({ path: "children", select:{fullname:1}})
    .then((data)=>{res.status(200).json(data);}).catch((err)=>{next(err)});
};
exports.getclasschildById = (req, res, next) => {
    classSchema.findOne({_id:req.params.id}).populate({ path: "children"})
    .then((data)=>{res.status(200).json(data.children);}).catch((err)=>{next(err)});
};
exports.getclassteacherById = (req, res, next) => {
    classSchema.findOne({_id:req.params.id}).populate({ path: "supervisor"})
    .then((data)=>{res.status(200).json(data.supervisor);}).catch((err)=>{next(err)});
};

exports.insert = (req, res, next) => {
 
    let object = new classSchema(req.body)
    object.save().then((data)=>{res.status(200).json({status: "success",
    message: "class created successfully"})}).catch((error) => next(error));

};

exports.update = (req, res, next) => {
    
    classSchema.findOneAndUpdate({ _id: req.body._id },req.body).then((data)=>{res.status(200).json(data);})

};

