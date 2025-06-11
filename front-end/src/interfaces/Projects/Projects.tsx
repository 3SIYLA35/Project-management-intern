import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../components/Profile/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

// Import components
import SideNav from '../../components/Main components/SideNav';
import Header from '../../components/Main components/Header';
import JumpToProject from '../../components/Projects/JumpToProject';
import ErrorBoundary from '../../components/Main components/ErrorBoundary';
import ProjectForm from '../../components/Projects/ProjectForm';
import ProjectFilters from '../../components/Projects/projectfilters';
import Viewtoggle from '../../components/Main components/viewtoggle';
import ProjectDetailPanel from './ProjectDetailPanel';
import { useProjectContext } from '../../Contexts/ProjectContext';
import { useProfile } from '../../hooks/useProfile';

export default function ProjectDashboard() {

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const context=useProfile();
  const {fetchallemployee ,employees}=context;
  const projectContext=useProjectContext();
  const {projects}=projectContext;
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
  const handleAddProject=()=>{
    navigate('/admin/project');
  };
  const toggleProjectModal=()=>{
    setprojectmodal(!showProjectmodal);
  };

  // Show project details
  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  // Close project detail panel
  const handleCloseProjectDetail = () => {
    setShowProjectDetail(false);
  };

  // Toggle Jump to project dialog
  const toggleJumpToProject = ()=>{
    setShowJumpModal(!showJumpModal);
  };

 

  const recentProjects=projects?.slice(0, 4);
  const previousProjects=projects?.slice(4, 8);

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

          {/* Flexible layout for project list and detail panel */}
          <div className="flex h-full overflow-hidden">
            {/* Project list */}
            <div className={`${showProjectDetail ? 'w-[50%] pr-4' : 'w-full'} overflow-y-auto hide-scrollbar transition-all duration-300`}>
              {/* Recent Projects */}
              <div className="mb-8">
                {viewmode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentProjects?.map((project, idx) => (
                      <div 
                        key={idx} 
                        className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-750"
                        onClick={() => handleViewProject(project as Project)}
                      >
                        <div className="p-5">
                          <div className="flex mb-4">
                            <div className={`w-8 h-8 flex items-center justify-center rounded bg-${project.color}-500 text-${project.color}-800`}>
                              {project?.color?.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-auto">
                              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                                {project.daysLeft} Days Left
                              </span>
                            </div>
                          </div>
                          <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-gray-400">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <div 
                                className={`bg-${project.color}-500 h-1.5 rounded-full`} 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {project?.members?.slice(0, 3).map((member, index) => (
                                <img 
                                  key={index} 
                                  src={member.avatar} 
                                  alt={member.name} 
                                  className="w-8 h-8 rounded-full border-2 border-gray-800" 
                                />
                              ))}
                              {project?.members && project.members.length >3 && (
                                <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-700 flex items-center justify-center text-gray-300 text-xs">
                                  +{project?.members?.length - 3}
                                </div>
                              )}
                            </div>
                            <div>
                            <span className={`text-xs px-2 py-1 rounded-full bg-${
                                project?.status==='in_progress'?'yellow' : 
                                project?.status==='completed'?'green':'blue'
                              }-500 text-white`}>
                                {project?.status!.charAt(0).toUpperCase() + project?.status!.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Project
                          </th>
                          {columns.assigned && (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Members
                            </th>
                          )}
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Progress
                          </th>
                          {columns.owner && (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Owner
                            </th>
                          )}
                          {columns.lastmodified && (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Due Date
                            </th>
                          )}
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Priority
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {recentProjects?.map((project, idx) => (
                          <tr 
                            key={idx} 
                            className="hover:bg-gray-750 cursor-pointer"
                            onClick={() => handleViewProject(project as Project)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 flex items-center justify-center rounded bg-${project.color}-500 text-${project.color}-800 mr-3`}>
                                  {project?.color?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white">{project.name}</div>
                                  <div className="text-sm text-gray-400">{project.description}</div>
                                </div>
                              </div>
                            </td>
                            {columns.assigned && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex -space-x-2">
                                  {project?.members?.slice(0, 3).map((member, index)=>(
                                    <img 
                                      key={index} 
                                      src={member.avatar} 
                                      alt={member.name} 
                                      className="w-8 h-8 rounded-full border-2 border-gray-800" 
                                    />
                                  ))}
                                  {project?.members && project.members.length > 3 && (
                                    <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-700 flex items-center justify-center text-gray-300 text-xs">
                                      +{project?.members?.length - 3}
                                    </div>
                                  )}
                                </div>
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm text-gray-400 mb-1">{project.progress}%</div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                  <div 
                                    className={`bg-${project.color}-500 h-1.5 rounded-full`} 
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            {columns.owner && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <img src={project?.owner?.avatar} alt="Owner" className="w-6 h-6 rounded-full mr-2" />
                                  <div className="text-sm text-gray-300">{project?.owner?.name}</div>
                                </div>
                              </td>
                            )}
                            {columns.lastmodified && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                {/* <div className="text-sm text-gray-300">{project?.endDate.toLocaleDateString()}</div> */}
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-xs px-2 py-1 rounded-full bg-${
                                project?.status==='in_progress'?'yellow' : 
                                project?.status==='completed'?'green':'blue'
                              }-500 text-white`}>
                                {project?.status!.charAt(0).toUpperCase() + project?.status!.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                              <button className="text-gray-400 hover:text-white px-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Project Detail  */}
            {showProjectDetail && (
              <div className="w-[50%] bg-gray-800 border-l border-gray-700 overflow-hidden rounded-lg">
                <ProjectDetailPanel 
                  isOpen={showProjectDetail} 
                  onClose={handleCloseProjectDetail} 
                  project={selectedProject}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Jump to project dialog */}
      <JumpToProject 
        showModal={showJumpModal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        projects={projects}
        toggleModal={toggleJumpToProject}
        handleViewProject={handleViewProject}
       />
    </div>
  );
}