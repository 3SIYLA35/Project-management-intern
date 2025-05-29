import { Project, Sprint } from "../components/Profile/types";

export interface SprintApi{
    _id:string;
    name:string;
    projectId:Project;
    startDate:Date;
    endDate:Date;
    status:string;
    goals:string;
}

export const adaptSprint=(sprintApi:SprintApi[]):Sprint[]=>{
    return sprintApi.map(sprint=>({
        id:sprint._id,
        name:sprint.name,
        projectId:sprint.projectId,
        startDate:sprint.startDate,
        endDate:sprint.endDate,
        status:sprint.status,
        goals:sprint.goals,
    }))
}

export const adaptsprintforApi=(sprintApi:Partial<Sprint>):Partial<SprintApi>=>{
    const sprintapi:Partial<SprintApi>={
        _id:sprintApi.id,
    }
    if(sprintApi.name!==undefined) sprintapi.name=sprintApi.name;
    if(sprintApi.projectId!==undefined) sprintapi.projectId=sprintApi.projectId;
    if(sprintApi.startDate!==undefined) sprintapi.startDate=sprintApi.startDate;
    if(sprintApi.endDate!==undefined) sprintapi.endDate=sprintApi.endDate;
    if(sprintApi.status!==undefined) sprintapi.status=sprintApi.status;
    if(sprintApi.goals!==undefined) sprintapi.goals=sprintApi.goals;

    return sprintapi;
    
}