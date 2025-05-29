import { sprintApi } from "../api/sprintApi";
import { Sprint } from "../components/Profile/types"
import { useEffect, useState } from "react"



export const useSprint=()=>{
    const [sprints,setSprints]=useState<Sprint[]|null>(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState<string|null>(null);

    const getSprints=async(projectId:string)=>{
        try{
            setLoading(true);
            const response=await sprintApi.getSprints(projectId);
            if(response.status===200){
                setSprints(response.data);
            }
            console.log('sprints fetched',response.data);
            return response.data;
        }catch(error){
            console.error('Error fetching sprints:',error);
            setError('Failed to fetch sprints');
        }finally{
            setLoading(false);
        }
    }

    return {sprints,loading,error,getSprints};
}