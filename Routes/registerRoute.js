const express = require('express');
const teacherController = require('./../Controller/teacherController');
const teacherValidation = require('./../Midelwares/validations/teacherValidation');
const validatorResult = require('./../Midelwares/validations/validatorResult');


const router = express.Router();


router.route('/register')
        .post(teacherController.uploadPhoto,teacherValidation.insert,validatorResult,teacherController.insert)


module.exports=router;