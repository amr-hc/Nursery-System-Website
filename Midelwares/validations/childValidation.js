const {body} = require('express-validator');

exports.insert=[
    body("age").isInt({ min: 0, max: 5 }).withMessage("age Must be between 0 and 5"),
    body("fullname").matches(/^[a-zA-Z][a-zA-Z][a-zA-Z]+(\s[a-zA-Z][a-zA-Z][a-zA-Z]+)*$/).withMessage("full name Must be string").isLength({min:3}).withMessage("Must be at least 3 characters"),
    body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("Level Must be PreKG or KG1 or KG2"),
    body("address.city").isAlpha().withMessage("City Must be String").isLength({min:3}).withMessage("City Must be at least 3 characters"),
    body("address.street").isInt().withMessage("Street Must be number"),
    body("address.building").isInt().withMessage("Bulding Must be number")
    
]

exports.update=[
    body("_id").isInt().withMessage("id Must be an integer"),
    body("age").optional().isInt({ min: 0, max: 5 }).withMessage("Must be between 0 and 5"),
    body("fullname").optional().matches(/^[a-zA-Z][a-zA-Z][a-zA-Z]+(\s[a-zA-Z][a-zA-Z][a-zA-Z]+)*$/).withMessage("full name Must be string").isLength({min:3}).withMessage("Must be at least 3 characters"),
    body("level").optional().isIn(["PreKG", "KG1", "KG2"]).withMessage("Must be PreKG or KG1 or KG2"),
    body("address.city").optional().isAlpha().withMessage("City Must be String").isLength({min:3}).withMessage("City Must be at least 3 characters"),
    body("address.street").optional().isInt().withMessage("Street Must be number"),
    body("address.building").optional().isInt().withMessage("Bulding Must be number")

]