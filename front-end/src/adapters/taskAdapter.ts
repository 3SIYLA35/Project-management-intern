import { Attachment, Project, Sprint, Task, UserProfile } from "../components/Profile/types";
import { adaptAttachment, adaptAttachmentForApi, AttachmentApi } from "./attachmentAdapter";
import { adaptuserProfile, addaptProfileforapi, ApiUserProfile } from "./profileAdapter";


export interface taskApi{
    task:{_id:string;
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
    updatedAt:Date,},
    attachments:AttachmentApi[]
}


export const adaptTask=(task:taskApi):Task=>{
    return  {
        id:task.task._id,
        name:task.task.name,
        description:task.task.description,
        status:task.task.status,
        priority:task.task.priority,
        startDate:task.task.startDate,
        dueDate:task.task.dueDate,
        projectId:task.task.projectId,
        assignedBy:adaptuserProfile(task.task.assignedBy),
        assignedTo:task.task.assignedTo?adaptuserProfile(task.task.assignedTo):null,
        sprintId:task.task.sprintId,
        attachment:task.attachments.map(attachment=>adaptAttachment(attachment)),
    }
}

export const adaptTaskForAPi=(task:Partial<Task>):Partial<taskApi>=>{

    
    const adaptedtask:Partial<taskApi>={
        task:{
            _id:task.id || '',
            name:task.name || '',
            description:task.description || '',
            status:'pending',
            priority:task.priority || '',
            startDate:task.startDate || new Date(),
            dueDate:task.dueDate || new Date(),
            projectId:task.projectId || {}as Project,
            assignedBy:task.assignedBy as ApiUserProfile | {}as ApiUserProfile,
            assignedTo:task.assignedTo as ApiUserProfile | null,
            sprintId:task.sprintId || {} as Sprint,
            createdAt:new Date(),
            updatedAt:new Date()
        },
        attachments:task.attachment? 
        task.attachment.map(att=>adaptAttachmentForApi(att) as AttachmentApi)
        :[] as AttachmentApi[]
    }
    

    if(task.name!==undefined) adaptedtask.task!.name=task.name;
    if(task.description!==undefined) adaptedtask.task!.description=task.description;
    if(task.status!==undefined) adaptedtask.task!.status=task.status;
    if(task.priority!==undefined) adaptedtask.task!.priority=task.priority;
    if(task.startDate!==undefined) adaptedtask.task!.startDate=new Date(task.startDate);
    if(task.dueDate!==undefined) adaptedtask.task!.dueDate=new Date(task.dueDate);
    if(task.projectId!==undefined) adaptedtask.task!.projectId=task.projectId;
    if(task.assignedBy!==undefined) adaptedtask.task!.assignedBy=addaptProfileforapi(task.assignedBy)as ApiUserProfile;
    if(task.assignedTo!==undefined) adaptedtask.task!.assignedTo=task?.assignedTo?addaptProfileforapi(task.assignedTo)as ApiUserProfile:null;
    if(task.sprintId!==undefined) adaptedtask.task!.sprintId=task.sprintId;
    if(task.attachment && task.attachment?.length>0){
        adaptedtask.attachments=task.attachment.map(atta=>adaptAttachmentForApi(atta))as AttachmentApi[];
    }
    return adaptedtask;
   
}



