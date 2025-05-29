import { Project, Sprint, Task, UserProfile } from "../components/Profile/types";
import { adaptuserProfile, addaptProfileforapi, ApiUserProfile } from "./profileAdapter";


export interface taskApi{
    _id:string;
    name:string,
    description:string,
    status:string,
    priority:string,
    startDate:Date,
    dueDate:Date,
    projectId:Project,
    assignedBy:ApiUserProfile,
    assignedTo?:ApiUserProfile|null,
    sprintId:Sprint,
    createdAt:Date,
    updatedAt:Date,
}


export const adaptTask=(task:taskApi):Task=>{
    return {
        id:task._id,
        name:task.name,
        description:task.description,
        status:task.status,
        priority:task.priority,
        startDate:task.startDate,
        dueDate:task.dueDate,
        projectId:task.projectId,
        assignedBy:adaptuserProfile(task.assignedBy),
        assignedTo:task.assignedTo?adaptuserProfile(task.assignedTo):null,
        sprintId:task.sprintId,
    }
}

export const adaptTaskForAPi=(task:Partial<Task>):Partial<taskApi>=>{
    const adaptedtask:Partial<taskApi>={
        _id:task.id,
    }

    if(task.name!==undefined) adaptedtask.name=task.name;
    if(task.description!==undefined) adaptedtask.description=task.description;
    if(task.status!==undefined) adaptedtask.status=task.status;
    if(task.priority!==undefined) adaptedtask.priority=task.priority;
    if(task.startDate!==undefined) adaptedtask.startDate=new Date(task.startDate);
    if(task.dueDate!==undefined) adaptedtask.dueDate=new Date(task.dueDate);
    if(task.projectId!==undefined) adaptedtask.projectId=task.projectId;
    if(task.assignedBy!==undefined) adaptedtask.assignedBy=addaptProfileforapi(task.assignedBy)as ApiUserProfile;
    if(task.assignedTo!==undefined) adaptedtask.assignedTo=task?.assignedTo?addaptProfileforapi(task.assignedTo)as ApiUserProfile:null;
    if(task.sprintId!==undefined) adaptedtask.sprintId=task.sprintId;


    return adaptedtask;
}



