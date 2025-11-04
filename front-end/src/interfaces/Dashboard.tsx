import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../components/Profile/types';

import ErrorBoundary from '../components/Main components/ErrorBoundary';

import StatCard from '../components/Dashboard/StatCard';
import TaskCard from '../components/Dashboard/TaskCard';
import TimeTracking from '../components/Dashboard/TimeTracking';
import ScheduleCard from '../components/Dashboard/ScheduleCard';
import Communication from '../components/Dashboard/Communication';

import TimeTracker from '../components/TimeTracker/TimeTracker';
import { useProjectContext } from '../Contexts/ProjectContext';

const Dashboard=()=>{
  const navigate = useNavigate();
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
      <div className='p-6'>
            {/* Stats Cards */}
            <div className=" border-2 border-gray-700  rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Task Due today" 
                value={7} 
                color="green"
                subtext="3 task completed"
                leftborder={false}
                icon={(
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5h10M9 9h10M9 13h10M9 17h10M5 5h.01M5 9h.01M5 13h.01M5 17h.01" />
                  </svg>
                )}
              />
              <StatCard 
                title="Meetings today" 
                value={5}  
                color="purple"
                subtext="Next kickoff Meeting at 1:00 PM"
                icon={(<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M5 11h14M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>)}
              />
              <StatCard 
                title="Hours Tracked" 
                value={12} 
                color="blue"
                subtext="Daily goal: 8 hours "
                icon={(<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>)}
              />
              <StatCard 
                title="Active Projects" 
                value={20} 
                color="purple"
                subtext="2 Nearing deadline"
                leftborder={false}
                icon={(<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>)}
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
    </ErrorBoundary>
  );
}

export default Dashboard;