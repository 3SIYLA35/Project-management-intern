const express=require('express');
const router=express.Router();
const LoginController=require('../Controllers/Login');
const {authenticateUser} =require('../Middleware/Auth');


router.get('/google/Login',LoginController.LoginWithgoogle);
router.post('/login', LoginController.login);
router.get('/verify', authenticateUser,LoginController.verifyToken);

module.exports=router;