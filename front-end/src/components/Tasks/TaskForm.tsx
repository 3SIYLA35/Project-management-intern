import React, { useState } from 'react';
import { IoAdd, IoClose } from 'react-icons/io5';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faSmile } from '@fortawesome/free-solid-svg-icons';

// Sample data for users and projects
const sampleUsers=[
  { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
  { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
  { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
  { id: '4', name: 'User 4', avatar: '/img/avatar-4.jpg' },
  { id: '5', name: 'User 5', avatar: '/img/avatar-5.jpg' },
];

const sampleProjects=[
  { id: '1', name: 'Marketing Website Redesign' },
  { id: '2', name: 'Mobile App Development' },
  { id: '3', name: 'Content Strategy' },
  { id: '4', name: 'Product Launch' },
];

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Project {
  id: string;
  name: string;
}

interface TaskFormProps {
  onClose: () => void;
  onSave: (task: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onSave }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [checklist, setChecklist] = useState<string[]>(['Inbox-Template']);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // New states for enhanced functionality
  const [assignees, setAssignees]=useState<User[]>([]);
  const [showAssigneeSelector,setShowAssigneeSelector]=useState(false);
  
  const [phase, setPhase] = useState('');
  const [showPhaseInput, setShowPhaseInput] = useState(false);
  const [phaseInputValue, setPhaseInputValue] = useState('');
  
  const [assignedProject, setAssignedProject] = useState<Project | null>(null);
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  
  const handleAddChecklistItem=() => {
    setChecklist([...checklist, '']);
  };
  
  const handleEmojiSelect = (emoji: any) => {
    setDescription(description + emoji.native);
    setShowEmojiPicker(false);
  };
  
  const handleAddAssignee = (user: User) => {
    if (!assignees.some(a => a.id === user.id)) {
      setAssignees([...assignees, user]);
    }
    setShowAssigneeSelector(false);
  };
  
  const handleRemoveAssignee = (userId: string) => {
    setAssignees(assignees.filter(a => a.id !== userId));
  };
  
  const handleSubmitPhase = () => {
    if (phaseInputValue.trim()) {
      setPhase(phaseInputValue.trim());
      setPhaseInputValue('');
      setShowPhaseInput(false);
    }
  };
  
  const handleSelectProject = (project: Project) => {
    setAssignedProject(project);
    setShowProjectSelector(false);
  };
  
  const handleSaveTask = () => {
    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      description,
      status: 'not_started',
      priority: `${priority} Priority`,
      phase,
      startDate,
      dueDate,
      assignees,
      assignedProject,
      comments: 0,
      attachments: 0,
      checklist
    };
    
    onSave(newTask);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-b-gray-600">
          <div className="flex items-center space-x-2">
            <span className="text-green-500 font-semibold">☑</span>
            <span className="text-white font-semibold">To Do</span>
          </div>
          <button onClick={onClose} className="text-gray-500 font-semibold text-2xl">×</button>
        </div>
        
        <div className="p-4 max-h-[80vh] hide-scrollbar overflow-y-auto">
                      <input
              type="text"
              placeholder="Task Name"
              className="w-full text-lg bg-gray-800 text-white pb-2 mb-4 focus:outline-none"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <p className="text-xs font-medium text-gray-500 mb-1">ASSIGNED TO</p>
              <div className="flex items-center flex-wrap gap-2">
                {assignees.length>0 ? (
                  assignees.map(user => (
                    <div key={user.id} className="flex items-center bg-gray-600 text-white rounded-full pr-2 overflow-hidden">
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full mr-1" />
                      <span className="text-xs">{user.name}</span>
                      <button 
                        className="ml-1 text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveAssignee(user.id)}
                      >
                        <IoClose size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <button 
                    className="text-gray-400 hover:text-blue-500"
                    onClick={() => setShowAssigneeSelector(!showAssigneeSelector)}
                  >
                    <IoAdd />
                  </button>
                )}
                {assignees.length > 0 && (
                  <button 
                    className="text-gray-400 hover:text-blue-500"
                    onClick={() => setShowAssigneeSelector(!showAssigneeSelector)}
                  >
                    <IoAdd />
                  </button>
                )}
              </div>
              
              {showAssigneeSelector && (
                <div className="absolute mt-1 z-10 bg-gray-700 hide-scrollbar text-white rounded shadow-lg border border-gray-600 max-h-48 w-full overflow-y-auto">
                  {sampleUsers.map(user => (
                    <div 
                      key={user.id} 
                      className="p-2 hover:bg-gray-600 flex items-center cursor-pointer"
                      onClick={() => handleAddAssignee(user)}>
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full mr-2" />
                      <span>{user.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">PRIORITY</p>
              <select 
                className="bg-gray-600 text-white border-none rounded px-2 py-1 w-full"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4 relative">
            <p className="text-xs font-medium text-gray-500 mb-1">PHASE</p>
            <div className="flex items-center">
              {phase ? (
                <div className="flex items-center justify-between w-full bg-gray-600 text-white px-3 py-1 rounded">
                  <span>{phase}</span>
                  <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => setPhase('')}
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  className="text-gray-400 hover:text-blue-500"
                  onClick={() => setShowPhaseInput(!showPhaseInput)}
                >
                  <IoAdd />
                </button>
              )}
            </div>
            
            {showPhaseInput && (
              <div className="mt-1 flex">
                <input
                  type="text"
                  placeholder="Enter phase name"
                  className="bg-gray-600 text-white border-none rounded-l px-2 py-1 flex-grow focus:outline-none focus:border-blue-300"
                  value={phaseInputValue}
                  onChange={(e) => setPhaseInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitPhase()}
                />
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-r hover:bg-blue-600"
                  onClick={handleSubmitPhase}
                >
                  Add
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">START DATE</p>
              <div className="flex items-center rounded-lg">
                <input
                  type="date"
                  className="p-1 w-full bg-gray-600 text-white rounded-lg border-none"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">DUE DATE</p>
              <div className="flex items-center rounded-lg">
                <input
                  type="date"
                  className="p-1 w-full bg-gray-600 text-white rounded-lg border-none"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4 relative">
            <p className="text-xs font-medium text-gray-500 mb-1">DESCRIPTION</p>
            <div className="relative">
              <textarea
                className="w-full border-none rounded-lg bg-gray-600 text-white hide-scrollbar p-2 min-h-[80px] focus:outline-none focus:border-blue-300"
                onInput={(e)=>{
                  e.currentTarget.style.height='20px';
                  e.currentTarget.style.height=e.currentTarget.scrollHeight+'px';
                }}
                placeholder="Add a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button 
                className="absolute right-2 bottom-2 text-gray-400 hover:text-blue-500"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😀
              </button>
              
              {showEmojiPicker && (
                <div className="absolute right-0 z-10">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme="light"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-4 relative">
            <p className="  text-xs font-medium text-gray-500 mb-1">ASSIGNED PROJECT</p>
                          <div className="flex items-center ">
                {assignedProject ? (
                  <div className="flex items-center justify-between w-full bg-gray-600 text-white px-3 py-1 rounded">
                  <span>{assignedProject.name}</span>
                  <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => setAssignedProject(null)}
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  className="text-gray-400 flex items-center hover:text-blue-500"
                  onClick={() => setShowProjectSelector(!showProjectSelector)}
                >
                  <IoAdd  className='mr-1'/> Link to Project
                </button>
              )}
            </div>
            
                          {showProjectSelector && (
                <div className="absolute mt-1 z-10 bg-gray-700 text-white rounded shadow-lg border border-gray-600 max-h-48 w-full overflow-y-auto">
                {sampleProjects.map(project => (
                  <div 
                    key={project.id} 
                    className="p-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleSelectProject(project)}
                  >
                    {project.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-1">ATTACHMENTS</p>
            <button className="flex items-center text-sm text-gray-500 hover:text-blue-500">
              <IoAdd className="mr-1" /> Add Attachment
            </button>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex border-b border-gray-600">
              <button className="text-gray-200 pb-2  font-medium mr-4">COMMENTS</button>
            </div>
            
            <div className="mt-4 relative bg-gray-600 rounded-lg p-2">
              <textarea
                placeholder="Add Comment..."
                className="w-full hide-scrollbar rounded-lg bg-gray-600 outline-none border-b-transparent border-b border-gray-200 pb-2 focus:outline-none"
                onInput={(e)=>{
                  e.currentTarget.style.height='30px';
                  e.currentTarget.style.height=e.currentTarget.scrollHeight+'px';
                }}
              />
              <div className="flex justify-between items-center">
                <button className="bg-gray-800 rounded-lg font-semibold text-white px-4 py-1 rounded text-sm">
                  
                  Comment</button>
                <div className="flex space-x-2">
                  <button className="text-gray-400">
                    <FontAwesomeIcon icon={faPaperclip} className='text-gray-200' />
                  </button>
                  <button 
                    className="text-gray-400"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <FontAwesomeIcon icon={faSmile} className='text-gray-200' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-4 ">
          <button 
            className="px-4 py-2 mr-2 rounded border rounded-lg w-[115px] bg-gray-100 text-gray-600 font-semibold border-1 border-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="bg-black text-white font-semibold  rounded-lg border-gray-600 w-[115px] hover:bg-gray-700 px-4 py-2 rounded"
            onClick={handleSaveTask}
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm; 