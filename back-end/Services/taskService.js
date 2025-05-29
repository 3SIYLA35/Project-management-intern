const taskmodel=require('../Models/tasks');

const TaskService={
    createtask:async(taskdata,iduser)=>{
        try{
            console.log("taskdata",taskdata);
            const  task=await taskmodel.create({
                ...taskdata,
                assignedBy:iduser
            })
            return task;
        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    }
}