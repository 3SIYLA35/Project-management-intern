

import { Project } from "../components/Profile/types";
import { apiClient } from "./apiClient";
import { adaptprojecct,adaptprojectforapi,Apiproject } from "../adapters/projectAdapter";

export const ProjectApi={
    createproject:async(projectdata:Partial<Project>)=>{
        try{
            const response=await apiClient.post<Apiproject>('/project/create-project',
                adaptprojectforapi(projectdata)
            );
            return adaptprojecct(response);
        }catch(err){
            console.error('error on createproject',err);
            throw err;
        }
    },
    updateproject:async(projectid:string,updatedata:Partial<Project>)=>{
        try{
            const response=await apiClient.put<Apiproject>(`/project/update-project/${projectid}`,
                adaptprojectforapi(updatedata)
            )
            if(!response){
                throw new Error('failed to update project');
            }
            console.log('data updated from api',response);
            return adaptprojecct(response);
        }catch(err){
            console.error('error on updateproject',err);
            throw err;
        }
    },
    getprojects:async()=>{
        try{
            console.log('fetching projects from api');
            const response=await apiClient.get<Apiproject[]>('/project/get-all-projects');
            console.log('projects fetched from api',response);
            return response.map(adaptprojecct);
        }catch(err){
            console.error('error on getprojects',err);
            throw err;
        }
    }

}