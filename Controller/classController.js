
const classSchema = require("./../Model/classModel");


const TeacherSchema = require("./../Model/teacherModel");
const childSchema = require("./../Model/childModel");


exports.getAllclass=(req,res,next)=>{
    classSchema.find({})
    .populate({ path: "supervisor", select:{fullname:1}}).populate({ path: "children", select:{fullname:1}})
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
 
    // req.body.children.forEach(e => {   
    //     childSchema.findOne({_id: e}).then(object=>{
    //         if(!object)
    //             next(new Error(`children id: ${e} is not Exist`));
    //     });
    // });

      
        childSchema.find({_id: {$in: req.body.children} }).then(object=>{
            if(object.length!=req.body.children.length){
                next(new Error("there is id children not Exist"));
            }else{

                TeacherSchema.findOne({_id: req.body.supervisor}).then(object=>{
                    if(!object)
                        next(new Error("This supervisor is not Exist"))
                    else
                    {
                        let object = new classSchema(req.body)
                        object.save().then((data)=>{res.status(200).json({ data: data })}).catch((error) => next(error));
                    }
                }).catch((err)=>{next(err)});

            }
        });






};

exports.update = (req, res, next) => {
    


    childSchema.find({_id: {$in: req.body.children} }).then(object=>{
        if(object.length!=req.body.children.length){
            next(new Error("there is id children not Exist"));
        }else{

            TeacherSchema.findOne({_id: req.body.supervisor}).then(object=>{
                if(!object)
                    next(new Error("This supervisor is not Exist"))
                else
                {
                    classSchema.findOneAndUpdate({ _id: req.body._id },req.body).then((data)=>{res.status(200).json(data);})
                }
            }).catch((err)=>{next(err)});

        }
    });

};

