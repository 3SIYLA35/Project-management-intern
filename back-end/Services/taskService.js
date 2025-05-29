const taskmodel=require('../Models/tasks');

 const TaskService={
    createtask:async(taskdata,iduser)=>{
        try{
            console.log("taskdata",taskdata);
            const {name,description,status,priority,startDate,dueDate,projectId,assignedTo,sprintId}=taskdata;
            const  task=await taskmodel.create({
                name,
                description,
                status,
                priority,
                startDate,
                dueDate,
                projectId:projectId._id,
                sprintId:sprintId._id,
                assignedTo:assignedTo._id,
                assignedBy:iduser,
            })
            return task;
        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    }
}
module.exports=TaskService;