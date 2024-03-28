const {body} = require('express-validator');

const TeacherSchema = require("./../../Model/teacherModel");
const childSchema = require("./../../Model/childModel");

checkIdChildren = async (children_id)=>{
    const children = await childSchema.find({_id: { $in : children_id }})
    if(children.length != children_id.length){
        return Promise.reject("there is id children not Exist");
    }else{
        return true;
    }
    
}

checkIdSupervisor = async (supervisor_id)=>{
    const supervisor = await TeacherSchema.findOne({_id: supervisor_id});
    if( supervisor == null ){
        return Promise.reject("This supervisor is not Exist");
    }else{
        return true;
    }
}

exports.insert=[
    body("supervisor").isInt().withMessage("id Must be an integer").custom(checkIdSupervisor),
    body("name").isAlpha().withMessage("name must be string").isLength({min:3}).withMessage("Must be at least 3 characters"),
    body("children").isArray().custom(checkIdChildren),
    body("children.*").optional().isInt().withMessage("Child ID must be an integer")
]

exports.update=[
    body("_id").isInt().withMessage("id Must be an integer"),
    body("supervisor").optional().isInt().withMessage("supervisor must be an integer").custom(checkIdSupervisor),
    body("name").optional().isAlpha().withMessage("name Must be string").isLength({min:3}).withMessage("name must be at least 3 characters"),
    body("children").optional().isArray().custom(checkIdChildren),
    body("children.*").optional().optional().isInt().withMessage("Child ID must be an integer")
]