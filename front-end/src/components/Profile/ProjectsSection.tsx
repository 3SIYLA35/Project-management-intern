import React from 'react';
import { UserProfile, Project } from './types';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProjectsSectionProps {
  profile: UserProfile;
  formatDate: (dateString: string) => string;
  className?: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  profile,
  formatDate,
  className = ""
}) => {
  // Helper function to calculate color based on progress
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return '#00ff00';
    if (progress >= 50) return '#0000ff';
    if (progress >= 25) return '#ffff00';
    return '#ff0000';
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      {profile.recentProjects && profile.recentProjects.length > 0 ? (
        <div className="space-y-6">
          {profile.recentProjects.map((project) => (
            <div key={project.id} className="bg-gray-750 rounded-md p-4">
              <div className="flex justify-between items-start">

                <div className='space-y-2'>
                  <h3 className="text-white font-medium">{project.name}</h3>
                  <p className="text-gray-400 text-sm">{project.role}</p>
                 
              
                     <div className=" ">
                       <button className="text-purple-400 hover:text-purple-300 text-sm">
                         View Project Details
                       </button>
                     </div>
                </div>
                
                <div className="w-24 h-24">
                  <CircularProgressbar      
                    value={project.progress}
                    text={`${project.progress}%`}
                    styles={
                        buildStyles({
                            pathColor:getProgressColor(project.progress),
                            trailColor: '#374151',
                            textColor: 'white',
                            
                        })
                    }
                  />
                </div>
            
              </div>
              

             
              </div>
            
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-2 text-gray-400">No recent projects found</p>
          <button className="mt-4 text-purple-400 hover:text-purple-300 text-sm border border-purple-800 rounded-md px-4 py-2">
            Browse Available Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection; 