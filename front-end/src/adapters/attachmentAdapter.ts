import { Attachment } from "../components/Profile/types";
import { UserProfile } from "../components/Profile/types";
import { Task } from "../components/Profile/types";
import { adaptuserProfile, addaptProfileforapi, ApiUserProfile } from "./profileAdapter";


export interface AttachmentApi{
    _id?:string;
    name:string;
    type:string;
    url:string;
    time:string;
    date:string;
    taskId:Task;
    uploadedBy:ApiUserProfile;
}

export const adaptAttachment=(attachment:AttachmentApi):Attachment=>{
    return{
        id:attachment._id || '',
        name:attachment.name,
        type:attachment.type,
        url:attachment.url,
        time:attachment.time,
        date:attachment.date,
        taskId:attachment.taskId,
        uploadedBy:adaptuserProfile(attachment.uploadedBy),
    }
}

export const adaptAttachmentForApi=(attachment:Partial<Attachment>):Partial<AttachmentApi>=>{
    console.log('attachment from adapter',attachment);
    const adaptedattachment:Partial<AttachmentApi>={
        _id:attachment.id,
    }

    if(attachment.name!==undefined) adaptedattachment.name=attachment.name;
    if(attachment.type!==undefined) adaptedattachment.type=attachment.type;
    if(attachment.url!==undefined) adaptedattachment.url=attachment.url;
    if(attachment.time!==undefined) adaptedattachment.time=attachment.time;
    if(attachment.date!==undefined) adaptedattachment.date=attachment.date;
    if(attachment.taskId!==undefined) adaptedattachment.taskId=attachment.taskId;
    if(attachment.uploadedBy!==undefined) adaptedattachment.uploadedBy=addaptProfileforapi(attachment.uploadedBy) as ApiUserProfile;

    return adaptedattachment;
}