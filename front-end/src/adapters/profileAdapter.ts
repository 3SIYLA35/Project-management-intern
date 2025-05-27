import { apiClient } from "@/api/apiClient";
import { UserProfile } from "@/components/Profile/types";

interface ApiUserprofile{
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    password?:string;
    Phone?:number;
    role?:string;
    avatarUrl?:string;
    lastLogin?:Date;
    department?:string;
    joinDate?:string; 
    location?:string;
    bio?:string;
    skills?:string[];
    age?:number;
    workinghours?:{
        days:string[],
        startTime:string,
        endTime:string,
    };
    coverImage?:string;

}
export type ApiUserProfile=ApiUserprofile;


export const adaptuserProfile=(apiClient:ApiUserprofile):UserProfile=>{
   return {
    id:apiClient._id,
    name:apiClient.firstName+' '+apiClient.lastName, 
    email:apiClient.email,
    avatar:apiClient.avatarUrl|| '/img/default-avatar.webp',
    role:apiClient.role||'member',
    department:apiClient.department || 'unassigned',
    joinDate: apiClient.joinDate ? new Date(apiClient.joinDate).toLocaleDateString('en-US',
        {year:'numeric',
            month:'long',
            day:'numeric'
        }
    ) : new Date().toLocaleDateString('en-US',
        {year:'numeric',
            month:'long',
            day:'numeric'
        }
    ),
    location:apiClient.location,
    bio:apiClient.bio,
    skills:apiClient.skills||[],
    age:apiClient.age,
    workingHours:apiClient.workinghours|| {days:[''],startTime:'',endTime:''},
    coverImage:apiClient.coverImage,
    lastLogin:apiClient.lastLogin|| new Date(0,0,0),
    phone:apiClient.Phone,
    recentProjects:[],
    timeZone:''
}
}

export const addaptProfileforapi=(profile:Partial<UserProfile>):Partial<ApiUserprofile>=>{
    const apiprofile:Partial<ApiUserprofile>={};
    if(profile.name!==undefined){
        const [firstName,lastName]=profile.name.split(' ');
        apiprofile.firstName=firstName;
        apiprofile.lastName=lastName;
    }
    if(profile.email!==undefined) apiprofile.email=profile.email;
    if(profile.avatar!==undefined) apiprofile.avatarUrl=profile.avatar;
    if(profile.role!==undefined) apiprofile.role=profile.role;
    if(profile.department!==undefined) apiprofile.department=profile.department;
    if(profile.joinDate!==undefined) apiprofile.joinDate=profile.joinDate;
    if(profile.location!==undefined) apiprofile.location=profile.location;
    if(profile.bio!==undefined) apiprofile.bio=profile.bio;
    if(profile.skills!==undefined) apiprofile.skills=profile.skills;
    if(profile.age!==undefined) apiprofile.age=profile.age;
    if(profile.workingHours!==undefined) apiprofile.workinghours=profile.workingHours;
    if(profile.coverImage!==undefined) apiprofile.coverImage=profile.coverImage;
    if(profile.lastLogin!==undefined) apiprofile.lastLogin=profile.lastLogin;
    if(profile.phone!==undefined) apiprofile.Phone=profile.phone;
     apiprofile._id=profile.id;
    // if(profile.recentProjects!==undefined) apiprofile.recentProjects=profile.recentProjects;
    // if(profile.timeZone!==undefined) apiprofile.timeZone=profile.timeZone;

    return apiprofile;
}
