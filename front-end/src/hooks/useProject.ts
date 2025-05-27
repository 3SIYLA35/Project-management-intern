import { ProjectApi } from "../api/projectApi";
import { Project } from "../components/Profile/types";
import { useEffect, useState } from "react";


export const useProject=()=>{
    const  [projects,setprojects]=useState<Project[]|null>(null);
    const [error,seterror]=useState<string|null>(null);
    const [loading,setloading]=useState(false);

    const createproject=async(projectdata:Project)=>{
        try{
            setloading(true);
            const data=await ProjectApi.createproject(projectdata);
            setprojects(prev=>[...(prev||[]),data]);
            setloading(false);
        }catch(err){
            seterror('failed to create project');
            console.error('error on createproject',err);
            setloading(false);
        }
    }
    const updateproject=async(projectid:string,updatedata:Partial<Project>)=>{
        try{
            setloading(true);
            const data=await ProjectApi.updateproject(projectid,updatedata);
            setprojects(prev=>prev?prev.map(project=>project.id===projectid?data:project):null);
            setloading(false);
        }catch(err){
            seterror('failed to update project');
            console.error('error on updateproject',err);
            setloading(false);
        }
    }
    const fetchprojects=async()=>{
        try{
            setloading(true);
            const data=await ProjectApi.getprojects();
            setprojects(data);
            setloading(false);
        }catch(err){
            seterror('failed to fetch projects');
            console.error('error on fetchprojects',err);
            setloading(false);
        }
    }

    useEffect(()=>{
        fetchprojects();
        
    },[]);
    return{projects,error,loading,createproject,updateproject,fetchprojects}
}