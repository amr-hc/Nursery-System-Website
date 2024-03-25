const loginController = require('../Controller/loginController');

const express = require('express');

const router = express.Router();

router.route('/login').post(loginController.login);

module.exports = router;



