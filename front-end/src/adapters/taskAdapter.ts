import { Project, Sprint, Task, UserProfile } from "../components/Profile/types";


interface TaskApi{
    _id:string;
    name:string,
    description:string,
    status:string,
    priority:string,
    startDate:Date,
    dueDate:Date,
    projectId:Project,
    assignedBy:UserProfile,
    assignedTo?:UserProfile|null,
    sprintId:Sprint,
    createdAt:Date,
    updatedAt:Date,
}


export const adaptTask=(task:TaskApi):Task=>{
    return {
        id:task._id,
        name:task.name,
        description:task.description,
        status:task.status,
        priority:task.priority,
        startDate:task.startDate,
        dueDate:task.dueDate,
        projectId:task.projectId,
        assignedBy:task.assignedBy,
        assignedTo:task.assignedTo?task.assignedTo:null,
        sprintId:task.sprintId,
    }
}

export const adaptTaskForAPi=(task:Partial<Task>):Partial<TaskApi>=>{
    const adaptedtask:Partial<TaskApi>={
        _id:task.id,
    }

    if(task.name!==undefined) adaptedtask.name=task.name;
    if(task.description!==undefined) adaptedtask.description=task.description;
    if(task.status!==undefined) adaptedtask.status=task.status;
    if(task.priority!==undefined) adaptedtask.priority=task.priority;
    if(task.startDate!==undefined) adaptedtask.startDate=task.startDate;
    if(task.dueDate!==undefined) adaptedtask.dueDate=task.dueDate;
    if(task.projectId!==undefined) adaptedtask.projectId=task.projectId;
    if(task.assignedBy!==undefined) adaptedtask.assignedBy=task.assignedBy;
    if(task.assignedTo!==undefined) adaptedtask.assignedTo=task?.assignedTo?task.assignedTo:null;
    if(task.sprintId!==undefined) adaptedtask.sprintId=task.sprintId;


    return adaptedtask;
}



