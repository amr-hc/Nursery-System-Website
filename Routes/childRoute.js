const express = require('express');
const childController = require('./../Controller/childController');
const childValidation = require('./../Midelwares/validations/childValidation');
const validatorResult = require('./../Midelwares/validations/validatorResult');


const router = express.Router();


router.route('/child')
        .get(childController.getAllChild)
        .post(childValidation.insert,validatorResult,childController.insert)
        .patch(childValidation.update,validatorResult,childController.update);




router.route('/child/:id').get(childController.getchildById)



module.exports=router;