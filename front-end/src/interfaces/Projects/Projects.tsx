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
import ProjectForm from '../../components/ProjectForm';
import ProjectFilters from '../../components/projectfilters';
import Viewtoggle from '../../components/viewtoggle';

export default function ProjectDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [showJumpModal, setShowJumpModal] = useState(false);
  const navigate = useNavigate();
  const [showProjectmodal,setprojectmodal]=useState(false);
  const [viewmode,setviewmode]=useState<'grid'|'list'>('grid');
  const [showfilters,setshowfilters]=useState(false);
  const [columns,setcolumns]=useState({
    assigned:true,
    owner:true,
    lastmodified:true,
    lastopened:true,
  });

  const handlecolumnchange=(column:keyof typeof columns,value:boolean)=>{
    setcolumns({
      ...columns,
      [column]:value
    })
  }



  // Handle navigation for sidebar items
  const handleNavigation=(path: string) => {
    navigate(path);
  };

  // Handle add project action
  const handleAddProject = () => {
    navigate('/admin/project');
  };
  const toggleProjectModal = () => {
    setprojectmodal(!showProjectmodal);
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
        owner:{ id: '4', name: 'Henry', avatar: '/img/avatar-4.jpg', email: 'henry@example.com' },
        priority: 'high',
        completedTasks: 12,
        totalTasks: 56,
        progress: 21,
        daysLeft: 12,
        startDate: '2019-04-01',
        endDate: '2019-04-09',
        members: [
          { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg', email: 'user1@example.com' },
          { id: '2', name: 'User 2', avatar: '/img/avatar-5.jpg', email: 'user2@example.com' },
          { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg', email: 'user3@example.com' }
        ],
        color: 'red'
      },
      {
        id: '2',
        name: 'second',
        description: 'Motion Design',
        status: 'in_progress',
        owner:{ id: '4', name: 'Henry', avatar: '/img/avatar-5.jpg', email: 'henry@example.com' },
        priority: 'medium',
        completedTasks: 7,
        totalTasks: 16,
        progress: 44,
        daysLeft: 12,
        startDate: '2019-04-01',
        endDate: '2019-04-11',
        members: [
          { id: '4', name: 'Henry', avatar: '/img/avatar-5.jpg', email: 'henry@example.com' }
        ],
        color: 'blue'
      },
      {
        id: '3',
        name: 'third',
        description: 'UX Design',
        status: 'in_progress',
        owner:{ id: '4', name: 'Henry', avatar: '/img/avatar-1.jpg', email: 'henry@example.com' },
        priority: 'low',
        completedTasks: 12,
        totalTasks: 56,
        progress: 21,
        daysLeft: 12,
        startDate: '2019-04-01',
        endDate: '2019-04-11',
        members: [
          { id: '5', name: 'Me', avatar: '/img/avatar-4.jpg', email: 'me@example.com' }
        ],
        color: 'green'
      },
      {
        id: '4',
        name: 'fourth',
        description: 'Branding',
        status: 'in_progress',
        owner: { id: '4', name: 'Henry', avatar: '/img/avatar-1.jpg', email: 'henry@example.com' },
        priority: 'medium',
        completedTasks: 12,
        
        totalTasks: 56,
        progress: 21,
        daysLeft: 12,
        startDate: '2019-04-01',
        endDate: '2019-04-20',
        members: [
          { id: '6', name: 'Ronak', avatar: '/img/avatar-1.jpg', email: 'ronak@example.com' },
          { id: '5', name: 'Me', avatar: '/img/avatar-5.jpg', email: 'me@example.com' },
          { id: '5', name: 'Me', avatar: '/img/avatar-2.jpg', email: 'me@example.com' },
          { id: '5', name: 'Me', avatar: '/img/avatar-3.jpg', email: 'me@example.com' }

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
            toggleProjectModal={toggleProjectModal}
            toggleJumpToProject={toggleJumpToProject}
            sourcepage='projects'
          />
        </ErrorBoundary>

        {/* Content */}

        <ProjectForm
          showmodal={showProjectmodal}
          togglemodal={toggleProjectModal}
          sourcepage='projects'
        />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex space-x-4  mb-4">
            <h1 className="text-2xl flex-1 font-bold">Project</h1>
            <Viewtoggle 
              viewmode={viewmode}
              onviewchange={setviewmode}
              showfilters={showfilters}
              ontogglefilters={()=>setshowfilters(!showfilters)}
            />
            {showfilters && (
              <div className="absolute right-8 top-32 z-50">
              <ProjectFilters
                columns={columns}
                oncolumnchange={handlecolumnchange}
              />
            </div>
            )}
          </div>
          <div className="flex space-x-4 mb-4 justify-end">

            
            <div className="flex space-x-2">
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
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md" onClick={handleAddProject}>
                Add Project
              </button>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mb-8">
        

            {viewmode==='grid' ?  (
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
            ):(
               <div className='bg-gray-800 rounded-lg overflow-hidden'>
                <table className='min-w-full divided-y divide-gray-700'>
                 <thead className='bg-gray-900'>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Progress
                    </th>
                    {columns.owner && (
                      <th className='px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider'>
                        Owner
                      </th>
                    )}
                    {columns.lastmodified && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                    )}
                    {columns.lastopened && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Last opened
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {recentProjects.map((project, idx) => (
                      <tr key={idx} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded bg-${project.color}-500 text-${project.color}-800 mr-3`}>
                              {project.color.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{project.name}</div>
                              <div className="text-sm text-gray-400">{project.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 h-2 bg-gray-700 rounded-full">
                              <div 
                                className={`h-2 bg-${project.color}-500 rounded-full`} 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400">{project.daysLeft} days left</span>
                          </div>
                        </td>
                        {columns.owner && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex -space-x-2">
                                <img
                                  className="w-9 h-9 rounded-full border-2 border-gray-800"
                                  src={project.owner.avatar}
                                  alt={project.owner.name}
                                />
                              
                              {/* {project.members.length > 3 && (
                                <div className="w-6 h-6 rounded-full bg-gray-700 text-xs text-gray-300 flex items-center justify-center border-2 border-gray-800">
                                  +{project.members.length - 3}
                                </div>
                              )} */}
                            </div>
                          </td>
                        )}
                        {columns.lastmodified && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {project.endDate}
                          </td>
                        )}
                        {columns.lastopened && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            3 days ago
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
               </div>
            )
            }
            
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