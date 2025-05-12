import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../models/interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"


// Import components
import SideNav from '../../components/SideNav';
import Header from '../../components/Header';
import JumpToProject from '../../components/JumpToProject';
import ErrorBoundary from '../../components/ErrorBoundary';

export default function ProjectDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [showJumpModal, setShowJumpModal] = useState(false);
  const navigate = useNavigate();

  // Handle navigation for sidebar items
  const handleNavigation=(path: string) => {
    navigate(path);
  };

  // Handle add project action
  const handleAddProject = () => {
    navigate('/admin/project');
  };

  // Show project details
  const handleViewProject = (id: string) => {
    navigate(`/project/jump`);
  };

  // Toggle Jump to project dialog
  const toggleJumpToProject = ()=>{
    setShowJumpModal(!showJumpModal);
  };

  // Mock projects - replace with actual API call
  useEffect(() => {
    // Simulating API call for demo purposes
    const mockProjects = [
      {
        id: '1',
        name: 'first',
        description: 'Website Design',
        status: 'in_progress',
        priority: 'high',
        completedTasks: 12,
        totalTasks: 56,
        progress: 21,
        daysLeft: 12,
        startDate: '2019-04-01',
        endDate: '2019-04-09',
        members: [
          { id: '1', name: 'User 1', avatar: 'https://via.placeholder.com/40', email: 'user1@example.com' },
          { id: '2', name: 'User 2', avatar: 'https://via.placeholder.com/40', email: 'user2@example.com' },
          { id: '3', name: 'User 3', avatar: 'https://via.placeholder.com/40', email: 'user3@example.com' }
        ],
        color: 'red'
      },
      {
        id: '2',
        name: 'second',
        description: 'Motion Design',
        status: 'in_progress',
        priority: 'medium',
        completedTasks: 7,
        totalTasks: 16,
        progress: 44,
        daysLeft: 12,
        startDate: '2019-04-01',
        endDate: '2019-04-11',
        members: [
          { id: '4', name: 'Henry', avatar: 'https://via.placeholder.com/40', email: 'henry@example.com' }
        ],
        color: 'blue'
      },
      {
        id: '3',
        name: 'third',
        description: 'UX Design',
        status: 'in_progress',
        priority: 'low',
        completedTasks: 12,
        totalTasks: 56,
        progress: 21,
        daysLeft: 12,
        startDate: '2019-04-01',
        endDate: '2019-04-11',
        members: [
          { id: '5', name: 'Me', avatar: 'https://via.placeholder.com/40', email: 'me@example.com' }
        ],
        color: 'green'
      },
      {
        id: '4',
        name: 'fourth',
        description: 'Branding',
        status: 'in_progress',
        priority: 'medium',
        completedTasks: 12,
        totalTasks: 56,
        progress: 21,
        daysLeft: 12,
        startDate: '2019-04-01',
        endDate: '2019-04-20',
        members: [
          { id: '6', name: 'Ronak', avatar: 'https://via.placeholder.com/40', email: 'ronak@example.com' }
        ],
        color: 'yellow'
      }
    ];
    
    setProjects(mockProjects);
  }, []);

  const recentProjects=projects.slice(0, 4);
  const previousProjects=projects.slice(4, 8);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ErrorBoundary>
        <SideNav activeItem="projects" handleNavigation={handleNavigation} />
      </ErrorBoundary>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ErrorBoundary>
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            handleAddProject={handleAddProject}
            toggleJumpToProject={toggleJumpToProject}
          />
        </ErrorBoundary>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex space-x-4 mb-4">
            <h1 className="text-2xl flex-1 font-bold">Project</h1>
            <div className="flex  space-x-2">
              <button className="p-2 rounded-full bg-yellow-500 text-yellow-800">
                <StarIcon className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full bg-orange-500 text-orange-800">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-blue-500 text-blue-800">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-green-500 text-green-800">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md" onClick={handleAddProject}>
                Add Project
              </button>
              <Select  >
                <SelectTrigger className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center">
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent className='text-white bg-gray-800'>
                  <SelectItem value="last week">Last Week</SelectItem>
                  <SelectItem value="last month">Last 15 days</SelectItem>
                  <SelectItem value="last year">Last 30 days</SelectItem>
                  <SelectItem value="last year">Last 60 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">From Last 7 Days</h2>
              <button className="text-purple-500 text-sm font-medium" onClick={() => handleNavigation('/projects/recent')}>See All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProjects.map((project, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-5">
                    <div className="flex mb-4">
                      <div className={`w-8 h-8 flex items-center justify-center rounded bg-${project.color}-500 text-${project.color}-800`}>
                        {project.color.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-auto">
                        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                          12 Days Left
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tasks Done:</span>
                        <span>02 / 56</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className={`bg-${project.color}-500 h-2 rounded-full`} style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {project.members.map((member, midx) => (
                          <img
                            key={midx}
                            className="w-8 h-8 rounded-full border-2 border-gray-800"
                            src={member.avatar}
                            alt={member.name}
                          />
                        ))}
                        <button 
                          className="w-8 h-8 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center border-2 border-gray-800"
                          onClick={() => handleNavigation(`/projects/${project.id}/members`)}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400" onClick={() => handleViewProject(project.id)}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 00.293.707V19a2 2 0 002-2z" />
                          </svg>
                        </button>
                        <button className="text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Projects */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Previous 30 days</h2>
              <button className="text-purple-500 text-sm font-medium" onClick={() => handleNavigation('/projects/previous')}>See All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {previousProjects.map((project, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-5">
                    <div className="flex mb-4">
                      <div className={`w-8 h-8 flex items-center justify-center rounded bg-${project.color}-500 text-${project.color}-800`}>
                        {project.color.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-auto">
                        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                          12 Days Left
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tasks Done:</span>
                        <span>02 / 56</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className={`bg-${project.color}-500 h-2 rounded-full`} style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {project.members.map((member, midx) => (
                          <img
                            key={midx}
                            className="w-8 h-8 rounded-full border-2 border-gray-800"
                            src={member.avatar}
                            alt={member.name}
                          />
                        ))}
                        <button 
                          className="w-8 h-8 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center border-2 border-gray-800"
                          onClick={() => handleNavigation(`/projects/${project.id}/members`)}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400" onClick={() => handleViewProject(project.id)}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 00.293.707V19a2 2 0 002-2z" />
                          </svg>
                        </button>
                        <button className="text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jump To Project Component */}
          <ErrorBoundary>
            <JumpToProject
              showModal={showJumpModal}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              projects={projects}
              toggleModal={toggleJumpToProject}
              handleViewProject={handleViewProject}
            />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}