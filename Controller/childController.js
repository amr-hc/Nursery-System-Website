
const childSchema = require("./../Model/childModel");


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
    object.save().then((data)=>{res.status(200).json({ data: data })}).catch((error) => next(error));
};

exports.update = (req, res, next) => {
childSchema.findOneAndUpdate({ _id: req.body._id },req.body).then((data)=>{res.status(200).json(data);});
};

exports.supervisors = (req, res, next) => {
res.status(200).json({ data: "supervisors" });
};
