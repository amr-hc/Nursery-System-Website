const express = require('express');
const teacherController = require('./../Controller/teacherController');
const teacherValidation = require('./../Midelwares/validations/teacherValidation');
const validatorResult = require('./../Midelwares/validations/validatorResult');
const {isAdmin,isAdminOrSameTeacher }= require('./../Midelwares/authenticationMW');


const router = express.Router();


router.route('/teachers')
        .get(isAdmin,teacherController.getAllTeacher)
        .post(isAdmin,teacherValidation.insert,validatorResult,teacherController.insert)
        .patch(isAdminOrSameTeacher,teacherValidation.update,validatorResult,teacherController.update);



router.route('/teachers/supervisors').get(teacherController.supervisors)

router.param("id",teacherController.cheackID);

router.route('/teachers/:id').get(teacherController.getTeacherById)



module.exports=router;