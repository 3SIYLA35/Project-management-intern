const sprintController=require('../Controllers/sprintController');
const express=require('express');
const router=express.Router();
const {authenticateUser}=require('../Middleware/Auth');

router.get('/get-sprints/:projectId',authenticateUser,sprintController.getSprints);

module.exports=router;