import { adaptAttachmentForApi } from "../adapters/attachmentAdapter";
import { adaptTask, adaptTaskForAPi } from "../adapters/taskAdapter";
import { Attachment, Task } from "../components/Profile/types";
import axios from "axios";
import { apiClient, extractErrorDetails } from "./apiClient";
import { taskApi } from "../adapters/taskAdapter";
import { AttachmentApi } from "../adapters/attachmentAdapter";


export const TaskApi={
    createTask:async(task:Task,attachments:Attachment[])=>{
        try{
            console.log('task',task);
            const taskdata=adaptTaskForAPi(task);
            console.log('taskdata',taskdata);
            const attachmentdata=attachments.map(attachment=>adaptAttachmentForApi(attachment));
            const data={
                taskdata:taskdata,
                attachment:attachmentdata,
            }
            const response=await apiClient.post<taskApi>('/task/create-task',data);
            if(response){
                return adaptTask(response);
            }
            return null;
        }catch(error:any){
            console.error("error on create task",error.message);
            return null;
        }
    },
    getTask:async()=>{
        try{
            const response=await apiClient.get<taskApi[]>('/task/get-my-tasks');
            console.log('response',response);
            if(response){
                return response.map(adaptTask) ;
            }
            return null;

        }catch(err:any){
            console.error("error on get task",err.message);
            return null;
        }
    },
    updateTask:async(task:Partial<Task>,taskid:string,attachment?:Attachment[])=>{
        try{
            const taskdata=adaptTaskForAPi(task);
            let attachmentdata:Partial<AttachmentApi>[]=[];
            console.log('attachment from api',attachment);
            if(attachment && attachment.length>0){
                attachmentdata=attachment.map(attachment=>adaptAttachmentForApi(attachment)) ;
            }
            const data={
                taskid:taskid,
                taskdata:taskdata,
                attachment:attachmentdata,
            }
            const response=await apiClient.put<taskApi>('/task/update-task',data);
           
            if(response){
                console.log('response',response);
                return adaptTask(response);
            }
            else{
                console.log('response',response);

            }
            return null;

        }catch(error:any){
            const erroEtils=extractErrorDetails(error);
            console.error("error on update task",erroEtils.message);
            return null;
        }
    },
    getalltask:async()=>{
        try{
            const response=await apiClient.get<taskApi[]>('/task/get-all-tasks');
            if(response){
                return response.map((task:taskApi)=>adaptTask(task) );
            }
            return null;
        }catch(error:any){
            console.error("error on get all task",error.message);
            return null;
        }
    },
    deleteattachments:async(attachmentid:string)=>{
        try{
            const response=await apiClient.delete<taskApi>(`/task/delete-attachment/${attachmentid}`);
            if(response){
                return response as unknown as Task;
            }
            return null;
        }catch(err:any){
            const erroEtils=extractErrorDetails(err);
            console.error("error on delete attachments",erroEtils.message);
            return null;
        }
    }
}
