const TaskService=require('../Services/taskService');
const attachmentService=require('../Services/attachmentService.cjs');
const AttachmentService = require('../Services/attachmentService.cjs');



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

exports.getmytasks=async(req,res)=>{
    try{
        const userid=req.user.id;
        if(!userid){
            return res.status(401).json({message:"unauthorized"});
        }
        const tasks=await TaskService.getmytasks(userid);
        if(!tasks){
            return res.status(400).json({message:"no tasks found"});
        }
        console.log('tasks',tasks);
        const specifictaks=await Promise.all(tasks.map(async(task)=>{
            return {attachments: await AttachmentService.getattachmentsbytaskid(task._id),
                task:task
            };
        }))
        console.log('specifictaks',specifictaks);
        return res.status(200).json({tasks});
    }catch(err){
        console.error("error on controller",err.message);
        return res.status(500).json({message:"error on controller"});
    }
}

exports.updatetask=async(req,res)=>{
    try{
        const userid=req.user.id;
        if(!userid){
            return res.status(401).json({message:"unauthorized"});
        }
        const {taskdata,attachment,taskid}=req.body;
        const task=await TaskService.gettaskbyid(taskid);
        if(!task){
            return res.status(400).json({message:"taskid not found"});
        }
        if(attachment){
            const saveattachment= await Promise.all(attachment.map(async(attachment)=>{
                return await attachmentService.saveAttachment(attachment,task._id,userid);
            }));
            if(!saveattachment){
                return res.status(400).json({message:"failed to save attachment"});
            }
        }
        const updatedtask=await TaskService.updatedtask(taskdata,taskid);
        if(!updatedtask){
            return res.status(400).json({message:"failed to update task"});
        }
        return res.status(200).json({message:"task updated successfully",task:updatedtask});


    }catch(error){
        console.error("error on controller",err.message);
        return res.status(500).json({message:"error on controller"});
    }
}