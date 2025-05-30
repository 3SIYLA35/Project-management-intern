import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/Main components/SideNav';
import Header from '../../components/Main components/Header';
import ErrorBoundary from '../../components/Main components/ErrorBoundary';
import Viewtoggle from '../../components/Main components/viewtoggle';
import ProjectFilters from '../../components/Projects/projectfilters';
import TaskDetailPanel from './TaskDetailPanel';
import AddTaskButton from '../../components/Tasks/AddTaskButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTaskContext } from '../../Contexts/TaskContext';
import {Task} from '../../components/Profile/types';

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewmode, setViewmode] = useState<'grid' | 'list'>('list');
  const [showfilters, setShowfilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const navigate = useNavigate();

  const TaskContext=useTaskContext();
  const tasks=TaskContext?.tasks;
  useEffect(()=>{
    TaskContext?.fetchmytasks();
  },[])
  
  const [columns, setColumns] = useState({
    assigned: true,
    owner: true,
    lastmodified: true,
    lastopened: true,
  });

  const handleColumnChange = (column: keyof typeof columns, value: boolean) => {
    setColumns({
      ...columns,
      [column]: value
    });
  };

  // Handle navigation for sidebar items
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Handle task selection
  const handleTaskClick=(task: Task)=>{
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  // Close task detail panel
  const handleCloseTaskDetail = () => {
    setShowTaskDetail(false);
  };

  
  // Function to get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in_progress':
        return 'bg-blue-500 text-white';
      case 'not_started':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleAddTask=async()=>{

  }

  // Function to format status display text
  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ErrorBoundary>
        <SideNav activeItem="tasks" handleNavigation={handleNavigation} />
      </ErrorBoundary>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ErrorBoundary>
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            toggleProjectModal={() => {}}
            toggleJumpToProject={() => {}}
            sourcepage='tasks'
          />
        </ErrorBoundary>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex space-x-4 mb-4 justify-between">
            
            <Viewtoggle 
              viewmode={viewmode}
              onviewchange={setViewmode}
              showfilters={showfilters}
              ontogglefilters={() => setShowfilters(!showfilters)}
            />
            <AddTaskButton onTaskAdded={handleAddTask} />
            
            {showfilters && (
              <div className="absolute right-8 top-32 z-50">
                <ProjectFilters
                  columns={columns}
                  oncolumnchange={handleColumnChange}
                />
              </div>
            )}
          </div>

          {/* Task content area - flexible layout */}
          <div className="flex h-full overflow-hidden">
            {/* Task list */}
            <div className={`${showTaskDetail ? 'w-[50%] pr-4' : 'w-full'} overflow-y-auto hide-scrollbar transition-all duration-300`}>
            {viewmode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks?.map((task)=>(
                  <div 
                    key={task.id} 
                    className="bg-gray-800 rounded-lg overflow-hidden p-4 cursor-pointer hover:bg-gray-750"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-3 rounded text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <h3 className="text-white font-medium">{task.name}</h3>
                      </div>
                      <div className="flex">
                        <button 
                          className="text-gray-400 hover:text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex -space-x-2">
                        
                          <img
                            src={task.assignedTo?.avatar }
                            alt={task.assignedTo?.name }
                            className="w-8 h-8 rounded-full border-2 border-gray-800"
                          />
                        
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeClass(task.status)}`}>
                        {formatStatus(task.status)}
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-4 text-gray-400 text-sm">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        {/* {task.comments} */}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        {/* {task.attachments} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg overflow-hidden hide-scrollbar">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className=" divide-gray-700">
                    <tr>
                      <th className="w-10 px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <input 
                          type="checkbox" 
                          className="rounded text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Assignees
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      {columns.lastmodified && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Files
                        </th>
                      )}
                      {columns.lastopened && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Comments
                        </th>
                      )}
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {tasks?.map((task) => (
                      <tr 
                        key={task.id} 
                        className="hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleTaskClick(task as Task)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            className="rounded text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{task.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex -space-x-2">
                              <img
                                src={task.assignedTo?.avatar}
                                alt={task.assignedTo?.name}
                                className="w-8 h-8 rounded-full border-2 border-gray-800"
                              />
                            
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeClass(task.status)}`}>
                            {formatStatus(task.status)}
                          </span>
                        </td>
                        {columns.lastmodified && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              {/* {task.attachments} */}
                            </div>
                          </td>
                        )}
                        {columns.lastopened && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              {/* {task.comments} */}
                            </div>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                          <button className="text-gray-400 hover:text-white ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
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

            {/* Task Detail Panel */}
            {showTaskDetail && (
              <div className="w-[50%]  bg-gray-800 border-l border-gray-700 overflow-hidden rounded-lg">
                <TaskDetailPanel
                  isOpen={showTaskDetail}
                  onClose={handleCloseTaskDetail}
                  task={selectedTask as Task}
                />
              </div>
            )}
          </div>
        </main>
      </div>

    </div>
  );
}