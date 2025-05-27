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
  lastLogin:Date;
  timeZone: string;
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

export interface BaseProfileSectionProps {
  isEditing: boolean;
  className?: string;
} 