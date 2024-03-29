const express = require('express');
const childController = require('./../Controller/childController');
const childValidation = require('./../Midelwares/validations/childValidation');
const validatorResult = require('./../Midelwares/validations/validatorResult');
const uploadController = require('./../Controller/uploadController');


const router = express.Router();


router.route('/child')
        .get(childController.getAllChild)
        .post(uploadController.uploadPhoto,childValidation.insert,validatorResult,childController.insert)
        .patch(uploadController.uploadPhoto,childValidation.update,validatorResult,childController.update);




router.route('/child/:id').get(childController.getchildById)



module.exports=router;