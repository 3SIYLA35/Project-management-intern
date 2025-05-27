const express=require('express');
const router=express.Router();
const PorjecctController=require('../Controllers/ProjectController');
const {authenticateUser}=require('../Middleware/Auth');


router.post('/create-project',authenticateUser,PorjecctController.createProject);
router.get('/get-all-projects',authenticateUser,PorjecctController.getallprojects);;
router.put('/update-project/:id',authenticateUser,PorjecctController.updateproject);

module.exports=router;