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
            if(response){
                setSprints(response as Sprint[]);
            }
            console.log('sprints fetched',response);
        }catch(error){
            console.error('Error fetching sprints:',error);
            setError('Failed to fetch sprints');
        }finally{
            setLoading(false);
        }
    }

    return {sprints,loading,error,getSprints};
}