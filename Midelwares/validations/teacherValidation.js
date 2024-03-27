const {body} = require('express-validator');

exports.insert=[
     body("fullname").matches(/^[a-zA-Z][a-zA-Z][a-zA-Z]+(\s[a-zA-Z][a-zA-Z][a-zA-Z]+)*$/).withMessage("fullname Must be string").isLength({min:3}).withMessage("fullname Must be at least 3 characters"),
     body("password").isString().isLength({min:8}).withMessage("Password must be at least 8 characters"),
     body("email").isEmail().withMessage("Must be a valid email"),
     body("image").optional().isString().withMessage("Image must be a string"),
     body("role").isIn(["teacher", "admin"]).withMessage("role Must be teacher or admin ")
]

exports.update=[
     body("_id").optional().isInt().withMessage("id Must be an integer"),
     body("fullname").optional().matches(/^[a-zA-Z][a-zA-Z][a-zA-Z]+(\s[a-zA-Z][a-zA-Z][a-zA-Z]+)*$/).withMessage("fullname Must be string").isLength({min:3}).withMessage("fullname Must be at least 3 characters"),
     body("password").custom((value)=>{if(value === undefined) return true;}).withMessage("cant update password here"),
     body("email").optional().isEmail().withMessage("Must be a valid email"),
     body("image").optional().isString().withMessage("Image must be a string"),
     body("role").optional().isIn(["teacher", "admin"]).withMessage("role Must be teacher or admin "),    
]

exports.updatePassword=[
     body("password").isString().isLength({min:8}).withMessage("Password must be at least 8 characters"),
]