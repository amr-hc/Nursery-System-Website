const express = require('express');
const childController = require('./../Controller/childController');
const childValidation = require('./../Midelwares/validations/childValidation');
const validatorResult = require('./../Midelwares/validations/validatorResult');
const uploadController = require('./../Controller/uploadController');
const {isAdmin}= require('./../Midelwares/authenticationMW');

const router = express.Router();


router.route('/child')
        .get(childController.getAllChild)
        .post(isAdmin,uploadController.uploadPhoto,childValidation.insert,validatorResult,childController.insert)
        .patch(isAdmin,uploadController.uploadPhoto,childValidation.update,validatorResult,childController.update);




router.route('/child/:id').get(childController.getchildById).delete(childController.deleteByID)



module.exports=router;