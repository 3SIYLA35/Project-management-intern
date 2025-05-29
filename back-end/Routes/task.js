const  express=require('express');
const router=express.Router();
const taskController=require('../Controllers/taskController');
const {authenticateUser}=require('../Middleware/Auth');

router.post('/create-task',authenticateUser,taskController.createtask);
router.get('/get-my-tasks',authenticateUser,taskController.getmytasks);
router.put('/update-task',authenticateUser,taskController.updatetask);

module.exports=router;