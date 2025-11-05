const express=require('express');
const router=express.Router();
const {authenticateUser}=require('../Middleware/Auth');
const employeeController=require('../Controllers/EmployeeController');
const upload=require('../Middleware/upload');

// router.get('/profile',authenticateUser,getProfileinfo);
router.get('/get-profile-info',authenticateUser,upload.fields([
    {name:'avatar',maxCount:1},
    {name:'banner',maxCount:1}
]),employeeController.getProfileinfo);
router.put('/update-profile-info',authenticateUser,employeeController.updateprofileinfo)
router.get('/get-all-employees',authenticateUser,employeeController.getallemployee);


module.exports=router;



