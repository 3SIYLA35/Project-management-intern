import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import Header from '../../components/Header';
import ErrorBoundary from '../../components/ErrorBoundary';
import Viewtoggle from '../../components/viewtoggle';
import ProjectFilters from '../../components/projectfilters';
import TaskDetailPanel from './TaskDetailPanel';
import AddTaskButton from '../../components/Tasks/AddTaskButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: string;
  name: string;
  description?: string;
  status: 'completed' | 'in_progress' | 'not_started';
  assignees: {
    id: string;
    name: string;
    avatar: string;
  }[];
  assignedBy?: {
    id: string;
    name: string;
    avatar: string;
  };
  assignee?: {
    id: string;
    name: string;
    avatar: string;
  };
  comments: number;
  attachments: number;
  priority?: string;
  dueDate?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewmode, setViewmode] = useState<'grid' | 'list'>('list');
  const [showfilters, setShowfilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const navigate = useNavigate();
  
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

  // Add a function to handle adding a new task
  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  // Mock tasks data
  useEffect(() => {
    const mockTasks: Task[] = [
        {
          id: '1',
          name: 'Process Documentation',
          description: 'Choose from profitable SaaS startups, vetted by the platform. Review key metrics to find the right fit. Negotiate directly with founders, without the costly middlemen. Most deals close within 30 days.',
          status: 'completed',
          assignees: [
            { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
            { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
            { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
          ],
          assignedBy: { id: '5', name: 'Ronak Chaitwal', avatar: '/img/avatar-1.jpg' },
          assignee: { id: '6', name: 'Kajol Kashyap', avatar: '/img/avatar-2.jpg' },
          dueDate: '25th February, 2020',
          priority: 'High Priority',
          comments: 8,
          attachments: 12,
        },
        {
          id: '2',
          name: 'Launch Marketing Campaign',
          description: 'Develop and execute a comprehensive marketing strategy to promote the new product launch. Focus on digital channels and track performance metrics.',
          status: 'in_progress',
          assignees: [
            { id: '4', name: 'User 4', avatar: '/img/avatar-4.jpg' },
            { id: '5', name: 'User 5', avatar: '/img/avatar-5.jpg' },
          ],
          assignedBy: { id: '7', name: 'Alice Johnson', avatar: '/img/avatar-4.jpg' },
          assignee: { id: '8', name: 'Bob Smith', avatar: '/img/avatar-5.jpg' },
          dueDate: '15th March, 2023',
          priority: 'Medium Priority',
          comments: 3,
          attachments: 5,
        },
        {
          id: '3',
          name: 'User Research Study',
          description: 'Conduct interviews with target users to gather feedback on the new feature prototype. Analyze results and prepare a report with recommendations.',
          status: 'not_started',
          assignees: [
            { id: '9', name: 'User 6', avatar: '/img/avatar-6.jpg' },
          ],
          assignedBy: { id: '10', name: 'Carol Davis', avatar: '/img/avatar-7.jpg' },
          assignee: { id: '9', name: 'User 6', avatar: '/img/avatar-6.jpg' },
          dueDate: '5th April, 2023',
          priority: 'Low Priority',
          comments: 1,
          attachments: 2,
        },
        {
          id: '4',
          name: 'Database Optimization',
          description: 'Review current database schema and implement optimizations to improve query performance. Document changes and measure performance improvements.',
          status: 'in_progress',
          assignees: [
            { id: '11', name: 'User 7', avatar: '/img/avatar-8.jpg' },
            { id: '12', name: 'User 8', avatar: '/img/avatar-9.jpg' },
          ],
          assignedBy: { id: '13', name: 'David Wilson', avatar: '/img/avatar-10.jpg' },
          assignee: { id: '11', name: 'User 7', avatar: '/img/avatar-8.jpg' },
          dueDate: '10th March, 2023',
          priority: 'High Priority',
          comments: 5,
          attachments: 3,
        },
        {
          id: '5',
          name: 'UI Design Review',
          description: 'Conduct a comprehensive review of the new user interface designs. Ensure consistency with brand guidelines and provide feedback to the design team.',
          status: 'not_started',
          assignees: [
            { id: '14', name: 'User 9', avatar: '/img/avatar-11.jpg' },
            { id: '15', name: 'User 10', avatar: '/img/avatar-12.jpg' },
          ],
          assignedBy: { id: '16', name: 'Emma Clark', avatar: '/img/avatar-13.jpg' },
          assignee: { id: '14', name: 'User 9', avatar: '/img/avatar-11.jpg' },
          dueDate: '20th March, 2023',
          priority: 'Medium Priority',
          comments: 0,
          attachments: 8,
        },
        {
          id: '6',
          name: 'API Integration',
          description: 'Integrate the payment gateway API with our platform. Implement error handling and conduct testing to ensure reliable operation.',
          status: 'completed',
          assignees: [
            { id: '17', name: 'User 11', avatar: '/img/avatar-14.jpg' },
          ],
          assignedBy: { id: '18', name: 'Frank Miller', avatar: '/img/avatar-15.jpg' },
          assignee: { id: '17', name: 'User 11', avatar: '/img/avatar-14.jpg' },
          dueDate: '1st March, 2023',
          priority: 'High Priority',
          comments: 12,
          attachments: 4,
        }
    ];
    
    setTasks(mockTasks);
  }, []);

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
                {tasks.map((task)=>(
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
                        {task.assignees.map((assignee, index) => (
                          <img
                            key={index}
                            src={assignee.avatar}
                            alt={assignee.name}
                            className="w-8 h-8 rounded-full border-2 border-gray-800"
                          />
                        ))}
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
                        {task.comments}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        {task.attachments}
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
                    {tasks.map((task) => (
                      <tr 
                        key={task.id} 
                        className="hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleTaskClick(task)}
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
                            {task.assignees.map((assignee, index) => (
                              <img
                                key={index}
                                src={assignee.avatar}
                                alt={assignee.name}
                                className="w-8 h-8 rounded-full border-2 border-gray-800"
                              />
                            ))}
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
                              {task.attachments}
                            </div>
                          </td>
                        )}
                        {columns.lastopened && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              {task.comments}
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