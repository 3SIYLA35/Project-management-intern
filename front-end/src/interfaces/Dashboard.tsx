import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../components/Profile/types';

// Import components
import SideNav from '../components/Main components/SideNav';
import Header from '../components/Main components/Header';
import JumpToProject from '../components/Projects/JumpToProject';
import ErrorBoundary from '../components/Main components/ErrorBoundary';
import ProjectForm from '../components/Projects/ProjectForm';

// Import Dashboard components
import StatCard from '../components/Dashboard/StatCard';
import TaskCard from '../components/Dashboard/TaskCard';
import TimeTracking from '../components/Dashboard/TimeTracking';
import ScheduleCard from '../components/Dashboard/ScheduleCard';
import Communication from '../components/Dashboard/Communication';

// Import time tracking component
import TimeTracker from '../components/TimeTracker/TimeTracker';
import { useProjectContext } from '../Contexts/ProjectContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showJumpModal, setShowJumpModal] = useState(false);
  const [showProjectmodal, setprojectmodal] = useState(false);
  
  // Time tracking state
  const [showTimeTracker, setShowTimeTracker] = useState(false);
  const [timeTracked, setTimeTracked] = useState({
    today: 4.5,
    week: 24.5
  });
  
  const projectContext=useProjectContext();
  const {projects}=projectContext;
  const [tasks,setTasks]=useState([
    {
      id: '1',
      name: 'return a package',
      status: 'to_do' as 'to_do',
      dueDate: '05 • 08',
      assignees: [
        { id: '1',name:'User 1',avatar:'/img/avatar-1.jpg' },
      ],
      comments: 3,
      attachments: 2
    },
    {
      id: '2',
      name: 'return slide components',
      status: 'in_progress' as 'in_progress',
      dueDate: '07 • 02',
      assignees: [
        { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
      ],
      comments: 5,
      attachments: 1
    },
    {
      id: '3',
      name: 'return auth api',
      status: 'in_progress' as 'in_progress',
      dueDate: '10 • 03',
      assignees: [
        { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
      ],
      comments: 2,
      attachments: 4
    },
    {
      id: '4',
      name: 'Return a package',
      status: 'completed' as 'completed',
      dueDate: '05 • 08',
      assignees: [
        { id: '4', name: 'User 4', avatar: '/img/avatar-4.jpg' },
      ],
      comments: 0,
      attachments: 1
    }
  ]);

  const [meetings,setMeetings]=useState([
    {
      id: '1',
      title: 'Kickoff meeting',
      startTime: '01:00 PM',
      endTime: '02:30 PM',
      isOnline: true,
      participants: [
        { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
        { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
        { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' }
      ]
    },
    {
      id: '2',
      title: 'Create WordPress website for event Registration',
      startTime: '3:00 PM',
      endTime: '4:45 PM',
      isOnline: false,
      location: 'Meeting Room 2',
      participants: [
        { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
        { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' }
      ]
    }
  ]);
  const [communications,setCommunications]=useState([
    {
      id:'1',
      sender:{
        id:'fm1',
        name:'haytham lkbir',
        avatar:'/img/avatar-1.jpg'
      },
      text:"Yes i am trying to do...",
      time:'10 minutes ago'
    },
    {
      id: '2',
      sender:{
        id:'mm2',
        name:'ilyas toubi',
        avatar:'/img/avatar-2.jpg'
      },
      text:"okii ca marche",
      time:'1 hour ago'
    },
    {
      id: '3',
      sender:{
        id:'tf3',
        name:'amina lmekaoui',
        avatar:'/img/avatar-3.jpg'
      },
      text:"oki j'arrive",
      time:'2 hours ago',
      isMissedCall:false
    }
  ]);
  
  const handleNavigation=(path:string)=>{
    navigate(path);
  };
  
  const toggleProjectModal=()=>{
    setprojectmodal(!showProjectmodal);
  };
  
  const toggleJumpToProject=()=>{
    setShowJumpModal(!showJumpModal);
  };
  
  const toggleTimeTracker=()=>{
    setShowTimeTracker(!showTimeTracker);
  };
  
  const handleViewProject=(project:Project)=>{
    navigate(`/project/${project.id}`);
  };

  const handleTaskClick=(taskId:string)=>{
    navigate(`/tasks?id=${taskId}`);
  };

  const handleViewAllTasks=()=>{
    navigate('/tasks');
  };

  const handleViewAllSchedule=()=>{
    navigate('/calendar');
  };

  const handleViewAllCommunication=()=>{
    navigate('/conversation');
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
            toggleTimeTracker={toggleTimeTracker}
            sourcepage='dashboard'
          />
          
          <div className='flex-1 overflow-auto p-6'>
            {/* Stats Cards */}
            <div className=" border-2 border-gray-700  rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Task Due today" 
                value="07" 
                color="green"
                subtext="3 task completed"
                leftborder={false}
              />
              <StatCard 
                title="Meetings today" 
                value="05" 
                color="purple"
                subtext="Next kickoff Meeting at 1:00 PM"
                leftborder={true}
              />
              <StatCard 
                title="Hours Tracked" 
                value="12" 
                color="blue"
                subtext="Daily goal: 8 hours 
                "
                leftborder={true}
              />
              <StatCard 
                title="Active Projects" 
                value="05" 
                color="purple"
                subtext="2 Nearing deadline"
                leftborder={false}
              />
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Tasks Section */}
              <div className="lg:col-span-7 h-[360px] p-5  border-2 border-gray-700 rounded-lg ">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-medium text-white">Today's Tasks</h2>
                  <button 
                    onClick={handleViewAllTasks}
                    className="text-sm text-blue-400 border-2 border-gray-800 p-2 rounded-lg hover:bg-gray-600 px-4 hover:text-blue-300"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4  ">
                  {tasks.slice(0,4).map((task, index) => (
                    <TaskCard 
                      key={task.id}
                      id={task.id}
                      name={task.name}
                      status={task.status}
                      dueDate={task.dueDate}
                      assignees={task.assignees}
                      comments={task.comments}
                      attachments={task.attachments}
                      onClick={handleTaskClick}
                      isLastTask={index === tasks.length - 1}
                    />
                  ))}
                </div>
              </div>
              
              {/* Right Sidebar */}
              <div className="lg:col-span-5 space-y-6">
                <TimeTracking 
                  todayHours={timeTracked.today}
                  weeklyHours={timeTracked.week}
                  dailyGoal={8}
                  weeklyGoal={40}
                />
                
              </div>
              <div className='lg:col-span-5 space-y-6'>
                <ScheduleCard 
                  meetings={meetings}
                  onViewAll={handleViewAllSchedule}
                />
              </div>
              <div className='w-[600px] space-y-6'>
                <Communication 
                  messages={communications}
                  onViewAll={handleViewAllCommunication}
                />
              </div>
            </div>
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
        
        {/* Time Tracker */}
        <TimeTracker 
          isOpen={showTimeTracker}
          onClose={toggleTimeTracker}
        />
      </div>
    </ErrorBoundary>
  );
}