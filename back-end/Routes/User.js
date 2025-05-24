const express=require('express');
const router=express.Router();
const authmiddleware=require('../Middleware/Auth');
const employeeController=require('../Controllers/EmployeeController');

router.get('/profile',authenticateUser,getProfileinfo);
router.get('/get-profile-info',authmiddleware,employeeController.getProfileinfo);

module.exports=router;



