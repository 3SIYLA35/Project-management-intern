import { Attachment, Task } from "@/components/Profile/types"
import { useEffect, useState } from "react"
import { TaskApi } from "../api/Taskapi"

 export const useTask=()=>{
    const [tasks,settasks]=useState<Task[]|null>(null);
    const [error,seterror]=useState<string|null>(null);
    const [loading,setloading]=useState(false);
    const createTask=async(task:Task,attachment:Attachment[])=>{
        try{
            setloading(true);
            const data=await TaskApi.createTask(task,attachment);
            if(data){
                settasks(prev=>[...(prev||[]),data])
                setloading(false);
                return data;
            }else{
                seterror('failed to create task');
                setloading(false);
                return null;
            }

        }catch(err){
            console.error('error on create task',err);
            seterror('failed to create task');
            setloading(false);
        }
    }
    const updatetask=async(task:Partial<Task>,taskid:string,attachment?:Attachment[],)=>{
        try{
            console.log('task',task);
           setloading(true);
           const data=await TaskApi.updateTask(task,taskid,attachment);
           if(data){
            settasks(prev=>prev? prev.map(t=>t.id===task.id?data:t):null);
            setloading(false);
            return data;
           }else{
            seterror('failed to update task');
            setloading(false);
            return null;
           }
        }catch(err){
            console.error('error on update task',err);
            seterror('failed to update task');
        }
    }
    const fetchmytasks=async()=>{
        try{
            setloading(true);
            const data=await TaskApi.getTask();
            if(data){
                settasks(data);
                setloading(false);
                console.log('data',data);
            }else{
                seterror('failed to fetch tasks');
                setloading(false);
            }
        }catch(err){
            console.error('error on fetch tasks',err);
        }
    }
    const fetchalltasks=async()=>{
        try{
            setloading(true);
            const data=await TaskApi.getalltask();
            if(data){
                settasks(data);
                setloading(false);
            }else{
                seterror('failed to fetch tasks');
                setloading(false);
            }
        }catch(err){
            console.error('error on fetch tasks',err);
        }
    }

    useEffect(()=>{
        fetchmytasks();
    },[])

    return{
        tasks,fetchalltasks,fetchmytasks,updatetask,createTask,loading,error
    }
}