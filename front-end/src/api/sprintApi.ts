import axios from "axios";
import { apiClient } from "./apiClient";
import { adaptSprint } from "../adapters/sprintAdapter";
import {SprintApi} from  '../adapters/sprintAdapter' ;


export const sprintApi={
    getSprints:async(projectId:string)=>{
        try{
            console.log('fetching sprints',projectId);
            const response=await apiClient.get<SprintApi[]>(`/sprint/get-sprints/${projectId}`);
            if(response){
                return adaptSprint(response);
            }
            console.log('sprints fetched',response);
            return null;
        }catch(error){
            console.error('Error fetching sprints:',error);
            
        }
    },
    

}