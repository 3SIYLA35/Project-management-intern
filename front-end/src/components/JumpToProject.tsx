import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Project } from '../models/interfaces';

interface JumpToProjectProps {
  showModal: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  projects: Project[];
  toggleModal: () => void;
   handleViewProject: (project: Project) => void;
}

const JumpToProject: React.FC<JumpToProjectProps> = ({
  showModal,
  searchTerm,
  setSearchTerm,
  projects,
  toggleModal,
  handleViewProject,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Jump To Project</h3>
          <button className="text-gray-400" onClick={toggleModal}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Project"
              className="bg-gray-700 text-gray-300 px-10 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <button className="absolute right-3 top-2.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto overflow-x-hidden  px-1 ">
          {projects
            .filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(project => (
              <div 
                key={project.id} 
                className={`flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer transition-all duration-300 ${
                  hoveredId === project.id ? 'bg-gray-600 shadow-lg -translate-y-1' : ''
                }`}
                onClick={() => {
                  handleViewProject(project);
                  toggleModal();
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div 
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white mr-3 transition-all duration-300`}
                  style={{ 
                    backgroundColor: getColorHex(project.color),
                    transform: hoveredId === project.id ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                  }}
                >
                  {project.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{project.name}</h4>
                  <p className="text-sm text-gray-400 truncate">{project.description}</p>
                </div>
              </div>
            ))
          }
          {projects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
            <div className="text-center text-gray-400 py-4">
              No projects found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to convert color names to hex
function getColorHex(color: string): string {
  const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    red: '#ef4444',
    yellow: '#f59e0b',
    pink: '#ec4899',
    indigo: '#6366f1'
  };
  
  return colorMap[color.toLowerCase()] || '#6366f1';
}

export default JumpToProject; 