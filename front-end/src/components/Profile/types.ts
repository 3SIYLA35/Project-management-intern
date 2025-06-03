export interface UserProfile{
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  joinDate:string;
  phone?: number;
  location?: string;
  bio?: string;
  skills: string[];
  age?: number;
  workingHours?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  recentProjects?: Project[];
  coverImage?: string ;
  lastLogin?:Date;
  timeZone?: string;
}

export interface Project{
  id: string;
  name: string;
  description?:string;
  startDate:Date;
  endDate:Date;
  color?:string;
  role?:string;
  status?:string;
  progress:number;
  completedTasks?:number;
  totalTasks?:number;
  daysLeft?:number;
  owner:UserProfile;
  members?:UserProfile[];
  createdAt?:string;
  updatedAt?:string;
}

export interface Task{
  id:string;
  name:string;
  description:string;
  status:string;
  priority:string;
  startDate:Date;
  dueDate:Date;
  projectId:Project;
  attachment?:Attachment[];
  assignedBy:UserProfile;
  assignedTo:UserProfile|null;
  sprintId:Sprint;
  
}
export interface Attachment{
  id?:string;
  name:string;
  type:string;
  url:string;
  time:string;
  date:string;
  taskId:Task;
  uploadedBy:UserProfile;
}

  export interface Sprint{
    id:string;
    name:string;
    projectId:Project;
    startDate:Date;
    endDate:Date;
    status:string;
    goals:string;
  }

  export interface Reply{
    id:string;
    content:string;
    user:UserProfile;
    parentReplyId:Reply|null;
    replyLevel:number;
    createdAt:Date;
    updatedAt:Date;
}

export interface Comment{
    id:string;
    content:string;
    taskId:Task;
    projectId:Project;
    user:UserProfile;
    replies:Reply[];
    createdAt:Date;
    updatedAt:Date;
}
export interface converstation{
  id:string;
  participants:Participant[];
  createdAt:Date;
  updatedAt:Date;
}
export interface Participant{
  user:UserProfile;
  isOnline:boolean;
}

export interface BaseProfileSectionProps {
  isEditing: boolean;
  className?: string;
} 