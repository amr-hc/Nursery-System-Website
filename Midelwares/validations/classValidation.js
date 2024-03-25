const {body} = require('express-validator');




exports.insert=[
    body("supervisor").isInt().withMessage("id Must be an integer"),
    body("name").isAlpha().withMessage("name must be string").isLength({min:3}).withMessage("Must be at least 3 characters"),
    body("children").isArray(),
    body("children.*").optional().isInt().withMessage("Child ID must be an integer")  
]

exports.update=[
    body("_id").isInt().withMessage("id Must be an integer"),
    body("supervisor").optional().isInt().withMessage("supervisor must be an integer"),
    body("name").optional().isAlpha().withMessage("name Must be string").isLength({min:3}).withMessage("name must be at least 3 characters"),
    body("children").optional().isArray(),
    body("children.*").optional().optional().isInt().withMessage("Child ID must be an integer")
]