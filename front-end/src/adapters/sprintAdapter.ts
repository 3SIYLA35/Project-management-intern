import { Project, Sprint } from "../components/Profile/types";

interface SprintApi{
    id:string;
    name:string;
    projectId:Project;
    startDate:Date;
    endDate:Date;
    status:string;
    goals:string;
}

export const adaptSprint=(sprintApi:SprintApi):Sprint=>{
    return{
        id:sprintApi.id,
        name:sprintApi.name,
        projectId:sprintApi.projectId,
        startDate:sprintApi.startDate,
        endDate:sprintApi.endDate,
        status:sprintApi.status,
        goals:sprintApi.goals,
    }
}

export const adaptsprintforApi=(sprintApi:Partial<Sprint>):Partial<SprintApi>=>{
    const sprintapi:Partial<SprintApi>={
        id:sprintApi.id,
    }
    if(sprintApi.name!==undefined) sprintapi.name=sprintApi.name;
    if(sprintApi.projectId!==undefined) sprintapi.projectId=sprintApi.projectId;
    if(sprintApi.startDate!==undefined) sprintapi.startDate=sprintApi.startDate;
    if(sprintApi.endDate!==undefined) sprintapi.endDate=sprintApi.endDate;
    if(sprintApi.status!==undefined) sprintapi.status=sprintApi.status;
    if(sprintApi.goals!==undefined) sprintapi.goals=sprintApi.goals;

    return sprintapi;
    
}