const taskmodel=require('../Models/tasks');

 const TaskService={
    createtask:async(taskdata,iduser)=>{
        try{
            console.log("taskdata",taskdata);
            const {name,description,status,priority,startDate,dueDate,projectId,assignedTo,sprintId}=taskdata;
            const projecctiid=projectId.id;
            const sprintidd=sprintId.id;
            const assignedtooid=assignedTo.id;
            const  task=await taskmodel.create({
                name,
                description,
                status,
                priority,
                startDate,
                dueDate,
                projectId:projecctiid,
                sprintId:sprintidd,
                assignedTo:assignedtooid,
                assignedBy:iduser,
            })
            return task;
        }catch(err){
            console.error("error on service",err.message);;;
            return null;
        }
    },
    getmytasks:async(userid)=>{
        try{
            const tasks=await taskmodel.find({assignedBy:userid}).populate('assignedBy')
            .populate('assignedTo');
            if(!tasks){
                return null;
            }
            return tasks;

        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    },
    gettaskbyid:async(taskid)=>{
        try{
            const task=await taskmodel.findById(taskid);
            if(!task){
                return null;
            }
            return task;
        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    },
    updatedtask:async(taskdata,taskid)=>{
        try{
            const task=await taskmodel.findByIdAndUpdate(
                taskid,
                {$set:taskdata},
                {new:true});
            if(!task){
                return null;
            }
            return task;
        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    }
}
module.exports=TaskService;