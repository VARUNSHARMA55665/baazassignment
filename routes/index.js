const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/get-user',passport.checkAuthentication,userController.getUser);
router.post('/update-user',userController.updateUser);
router.get('/logout',userController.logout);

router.post('/login', passport.authenticate(
    'local',
), userController.login);

module.exports = router;