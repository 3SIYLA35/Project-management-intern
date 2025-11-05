import { Project, UserProfile } from "../components/Profile/types";
import { adaptuserProfile, addaptProfileforapi, ApiUserProfile } from "./profileAdapter";


export interface ApiProject{
    _id:string;
    name:string;
    description?:string;
    startDate:string;
    endDate:string;
    color?:string;
    status?:string;
    progress?:number;
    completedTasks?:number;
    totalTasks?:number;
    daysLeft?:number;
    owner:ApiUserProfile;
    members?:ApiUserProfile[];
    createdAt:Date;
    updatedAt:Date;
}

export type Apiproject=ApiProject;

export const adaptprojecct=(apiclient:ApiProject):Project=>{

    const startD=new Date(apiclient.startDate);
    const endD=new Date(apiclient.endDate);
    return{
        id:apiclient._id,
        name:apiclient.name,
        description:apiclient.description,
        startDate:startD.toLocaleDateString('en-US',{
            year:'numeric',
            month:'long',
            day:'numeric'
        }),
        endDate:endD.toLocaleDateString('en-US',{
            year:'numeric',
            month:'long',
            day:'numeric'
        }),
        color:apiclient.color,
        status:apiclient.status,
        progress:apiclient.progress||0,
        completedTasks:apiclient.completedTasks,
        totalTasks:apiclient.totalTasks,
        daysLeft:apiclient.daysLeft,
        role:apiclient.members?.[0]?.role||'member',
        owner:adaptuserProfile(apiclient.owner),
        members:apiclient.members?.map(member=>adaptuserProfile(member))||[]
    }
}

export const adaptprojectforapi=(project:Partial<Project>):Partial<ApiProject>=>{
    const apiProject:Partial<ApiProject>={};

    console.log('project',project);
    if(project.name!==undefined)apiProject.name=project.name;
    if(project.description!==undefined)apiProject.description=project.description;
    if(project.endDate!==undefined)apiProject.endDate=new Date(project.endDate).toISOString();
    if(project.startDate!==undefined)apiProject.startDate=new Date(project.startDate).toISOString();
    if(project.color!==undefined)apiProject.color=project.color;
    if(project.status!==undefined)apiProject.status=project.status;
    if(project.progress!==undefined)apiProject.progress=project.progress;
    if(project.completedTasks!==undefined)apiProject.completedTasks=project.completedTasks;
    if(project.totalTasks!==undefined)apiProject.totalTasks=project.totalTasks;
    if(project.daysLeft!==undefined)apiProject.daysLeft=project.daysLeft;
    if(project.members!==undefined)
        {apiProject.members=project.members?.map(
        member=>
            {
                const profifle=addaptProfileforapi(member);
                profifle._id=member.id;
                return profifle as ApiUserProfile;
            });}
    if(project.updatedAt!==undefined)apiProject.updatedAt=new Date(project.updatedAt);

    return apiProject;
}

