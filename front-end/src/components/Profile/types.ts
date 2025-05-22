export interface UserProfile{
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  joinDate: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills: string[];
  timeZone: string;
  age?: number;
  workingHours?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  recentProjects?: Project[];
  coverImage?: string | null;
}

export interface Project{
  id: string;
  name: string;
  role: string;
  progress: number;
  lastActive: string;
}

export interface BaseProfileSectionProps {
  isEditing: boolean;
  className?: string;
} 