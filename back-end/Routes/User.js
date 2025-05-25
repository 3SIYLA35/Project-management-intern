const express=require('express');
const router=express.Router();
const {authenticateUser}=require('../Middleware/Auth');
const employeeController=require('../Controllers/EmployeeController');

// router.get('/profile',authenticateUser,getProfileinfo);
router.get('/get-profile-info',authenticateUser,employeeController.getProfileinfo);
router.put('/update-profile-info',authenticateUser,employeeController.updateprofileinfo)

module.exports=router;



