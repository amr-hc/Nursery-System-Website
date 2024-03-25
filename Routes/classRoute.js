const express = require('express');
const classController = require('../Controller/classController');
const classValidation = require('./../Midelwares/validations/classValidation');
const validatorResult = require('./../Midelwares/validations/validatorResult');


const router = express.Router();


router.route('/class')
        .get(classController.getAllclass)
        .post(classValidation.insert,validatorResult,classController.insert)
        .patch(classValidation.update,validatorResult,classController.update);




router.route('/class/:id').get(classController.getclassById)
router.route('/class/child/:id').get(classController.getclasschildById)
router.route('/class/teacher/:id').get(classController.getclassteacherById)



module.exports=router;