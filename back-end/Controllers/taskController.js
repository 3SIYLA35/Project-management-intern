const TaskService=require('../Services/taskService');
const attachmentService=require('../Services/attachmentService');



exports.createtask=async(req,res)=>{
    try{
        const iduser=req.user.id;
        if(!iduser){
            return res.status(401).json({message:"unauthorized"});
        }
        const {attachment,taskdata}=req.body;
        if(!taskdata && !attachment){
            return res.status(400).json({message:"taskdata and attachment are required"});
        }
        const task=await TaskService.createtask(taskdata,iduser);
        if(!task){
            return res.status(400).json({message:"failed to save task"});
        }

        const saveAttachment=await attachmentService.saveAttachment(attachment,task._id,iduser);
        if(!saveAttachment){
            return res.status(400).json({message:"failed to save attachment"});
        }
        return res.status(201).json({message:"task created successfully",task,attachment:saveAttachment});
    }catch(err){
        console.error("error on controller",err.message);
        return res.status(500).json({message:"error on controller"});
    }
}