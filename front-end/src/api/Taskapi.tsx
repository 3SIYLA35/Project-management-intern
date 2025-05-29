import { adaptAttachmentForApi } from "../adapters/attachmentAdapter";
import { adaptTask, adaptTaskForAPi } from "../adapters/taskAdapter";
import { Attachment, Task } from "../components/Profile/types";
import axios from "axios";


export const TaskApi={
    createTask:async(task:Task,attachments:Attachment[])=>{
        try{
            const taskdata=adaptTaskForAPi(task)
            const attachmentdata=attachments.map(attachment=>adaptAttachmentForApi(attachment));
            const data={
                taskdata:taskdata,
                attachment:attachmentdata,
            }
            const response=await axios.post('/task/create-task',data);
            if(response.status===200){
                return response.data;
            }
            return null;
        }catch(error:any){
            console.error("error on create task",error.message);
            return null;
        }
    },
    getTask:async()=>{
        try{
            const response=await axios.get('/task/get-my-tasks');
            if(response.status===200){
                return response.data;
            }
            return null;

        }catch(err:any){
            console.error("error on get task",err.message);
            return null;
        }
    },
    updateTask:async(task:Task,attachment:Attachment)=>{
        try{
            const taskdata=adaptTaskForAPi(task);
            const attachmentdata=adaptAttachmentForApi(attachment);
            const data={
                taskdata:taskdata,
                attachment:attachmentdata,
            }
            const response=await axios.put('/task/update-task',data);
            if(response.status===200){
                return response.data;
            }
            return null;

        }catch(error:any){
            console.error("error on update task",error.message);
            return null;
        }
    },
    getalltask:async()=>{
        try{
            const response=await axios.get('/task/get-all-tasks');
            if(response.status===200){
                return response.data;
            }
            return null;
        }catch(error:any){
            console.error("error on get all task",error.message);
            return null;
        }
    }
}
