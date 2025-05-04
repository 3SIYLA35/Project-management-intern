const express=require('express');
const router=express.Router();
const LoginController=require('../Controllers/Login');


router.get('/google/Login',LoginController.LoginWithgoogle);

module.exports=router;