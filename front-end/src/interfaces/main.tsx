import SideNav from "../components/Main components/SideNav";
import ErrorBoundary from "../components/Main components/ErrorBoundary";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Main components/Header";
import { useProfileContext } from "../Contexts/ProfileContext";
import { useState } from "react";
import { Project } from "../components/Profile/types";
import JumpToProject from "../components/Projects/JumpToProject";
import { useProjectContext } from "../Contexts/ProjectContext";
import ProjectForm from "../components/Projects/ProjectForm";
import TimeTracker from "../components/TimeTracker/TimeTracker";
import Dashboard from "./Dashboard";

export default function Main(){
    const navigate=useNavigate();
    const [searchTerm,setsearchTerm]=useState('');
    const [showJumpModal,setShowJumpModal]=useState(false);
   const [showProjectmodal,setprojectmodal]=useState(false);
   const [showTimeTracker,setShowTimeTracker]=useState(false);
   const projectContext=useProjectContext();
   const location=useLocation();
   const [closeSideNav,setCloseSideNav]=useState(false);
   const {projects}=projectContext;
   const getactivepage=()=>{
        const path=location.pathname;
        if(path.startsWith('/Dashboard')) return 'Dashboard';
        if(path.startsWith('/projects')) return 'projects';
        if(path.startsWith('/tasks')) return 'tasks';
        if(path.startsWith('/Calendar')) return 'calendar';
        if(path.startsWith('/Conversation')) return 'conversation';
        if(path.startsWith('/Profile')) return 'profile';
        if(path.startsWith('/admin/invite') ) return 'invite';
        return 'Dashboard';
   }
   const toggleProjectModal=()=>{
    setprojectmodal(!showProjectmodal);
  };
  
  const toggleJumpToProject=()=>{
    setShowJumpModal(!showJumpModal);
  };
  const toggleTimeTracker=()=>{
    setShowTimeTracker(!showTimeTracker);
  };
  const handlenavigate=(path:string)=>{
    console.log("current path -->"+path)
        navigate(path);
    }
  const handleViewProject=(project:Project)=>{
        navigate(`/project/${project.id}`);
      };
  const {profile}=useProfileContext();
    
    return(
    <ErrorBoundary>
        <div className="flex  h-screen bg-gray-900 text-white">
          <SideNav activeItem={getactivepage()}
           handleNavigation={handlenavigate}
           CloseNav={closeSideNav}
           role={profile?.role}
           ></SideNav>
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header 
              avatar={profile?.avatar}
              searchTerm={searchTerm}
              setSearchTerm={setsearchTerm}
              toggleJumpToProject={toggleJumpToProject}
              toggleProjectModal={toggleProjectModal}
              toggleTimeTracker={toggleTimeTracker}
              sourcepage={'Main'}
              setCloseNav={setCloseSideNav}
              CloseNav={closeSideNav}
             ></Header>

             
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>

            </div>

        <JumpToProject 
          showModal={showJumpModal}
          searchTerm={searchTerm}
          setSearchTerm={setsearchTerm}
          projects={projects}
          toggleModal={toggleJumpToProject}
          handleViewProject={handleViewProject}
        />

        <ProjectForm
          showmodal={showProjectmodal}
          togglemodal={toggleProjectModal}
          sourcepage='dashboard'
        />
        
        {/* Time Tracker */}
        <TimeTracker 
          isOpen={showTimeTracker}
          onClose={toggleTimeTracker}
        />

        </div>
        
    </ErrorBoundary>);

}