const  express=require('express');
const router=express.Router();
const taskController=require('../Controllers/taskController');
const {authenticateUser}=require('../Middleware/Auth');

router.post('/create-task',authenticateUser,taskController.createtask);

module.exports=router;