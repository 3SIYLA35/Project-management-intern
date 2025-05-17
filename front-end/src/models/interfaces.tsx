export interface Project{
    id:string;
    name:string;
    description:string;
    startDate:string;
    owner:Member;
    endDate:string;
    priority:string;
    status:string;
    members:Member[];
    color:string;
    progress:number;
    completedTasks:number;
    totalTasks:number;
    daysLeft:number;
}
export interface Member{
    id:string;
    name:string;
    email:string;
    avatar:string;

}
export interface User{
    id:string;
    name:string;
    email:string;
    avatar:string;
}