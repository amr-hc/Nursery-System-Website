const express = require('express');
const teacherController = require('./../Controller/teacherController');
const teacherValidation = require('./../Midelwares/validations/teacherValidation');
const validatorResult = require('./../Midelwares/validations/validatorResult');
const uploadController = require('./../Controller/uploadController');


const router = express.Router();


router.route('/register')
        .post(uploadController.uploadPhoto,teacherValidation.insert,validatorResult,teacherController.insert)


module.exports=router;