import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { Navigate, useNavigate } from 'react-router-dom';
import { Project } from '../models/interfaces';

// Import components
import SideNav from '../components/SideNav';
import Header from '../components/Header';
import JumpToProject from '../components/JumpToProject';
import ErrorBoundary from '../components/ErrorBoundary';
import ProjectForm from '../components/ProjectForm';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showJumpModal, setShowJumpModal]=useState(false);
  const [showProjectmodal,setprojectmodal]=useState(false);
  
  // Example projects data - replace with actual data fetching
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Project Management App',
      description: 'A project management application with task tracking',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      owner:{ id: '4', name: 'Henry', avatar: '/img/avatar-1.jpg', email: 'henry@example.com' },
      priority: 'High',
      status: 'In Progress',
      members: [
        { id: 'user1', name: 'John Doe', email: 'john@example.com', avatar: 'https://via.placeholder.com/40' }
      ],
      color: 'blue',
      progress: 60,
      completedTasks: 24,
      totalTasks: 40,
      daysLeft: 45
    },
    {
      id: '2',
      name: 'E-commerce Website',
      description: 'Online shopping platform with user accounts',
      startDate: '2023-03-15',
      endDate: '2023-09-30',
      owner:{ id: '4', name: 'Henry', avatar: '/img/avatar-1.jpg', email: 'henry@example.com' },
      priority: 'Medium',
      status: 'Planning',
      members: [
        { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://via.placeholder.com/40' }
      ],
      color: 'green',
      progress: 30,
      completedTasks: 12,
      totalTasks: 40,
      daysLeft: 120
    },
    {
      id: '3',
      name: 'Mobile Banking App',
      description: 'Secure banking application for smartphones',
      startDate: '2023-02-10',
      endDate: '2023-11-15',
      owner:{ id: '4', name: 'Henry', avatar: '/img/avatar-1.jpg', email: 'henry@example.com' },
      priority: 'Critical',
      status: 'Development',
      members: [
        { id: 'user3', name: 'Alex Johnson', email: 'alex@example.com', avatar: 'https://via.placeholder.com/40' }
      ],
      color: 'purple',
      progress: 45,
      completedTasks: 18,
      totalTasks: 40,
      daysLeft: 75
    }
  ]);
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const toggleProjectModal = () => {
    setprojectmodal(!showProjectmodal);
  };
  
  const toggleJumpToProject=()=>{
    setShowJumpModal(!showJumpModal);
  };
  
  const handleViewProject = (id: string) => {
    navigate(`/project/${id}`);
  };

  return (
    <ErrorBoundary>
      <div className='flex h-screen bg-gray-900 text-white'>
        <SideNav activeItem="dashboard" handleNavigation={handleNavigation} />

        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleProjectModal={toggleProjectModal}
            toggleJumpToProject={toggleJumpToProject}
            sourcepage='dashboard'
          />
          
          <div className='flex-1 overflow-auto p-6'>
            {/* Dashboard content goes here */}
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <p>Welcome to your project dashboard</p>
        </div>
      </div>

        {/* Jump to project modal */}
        <JumpToProject 
          showModal={showJumpModal}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          projects={projects}
          toggleModal={toggleJumpToProject}
          handleViewProject={handleViewProject}
        />
        <ProjectForm
          showmodal={showProjectmodal}
          togglemodal={toggleProjectModal}
          sourcepage='dashboard'
        />
      </div>
    </ErrorBoundary>
  );
}