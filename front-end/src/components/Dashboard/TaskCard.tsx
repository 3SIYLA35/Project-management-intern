import React from 'react';

interface TaskCardProps {
  id: string;
  name: string;
  dueDate?: string;
  status: 'completed' | 'in_progress' | 'to_do';
  assignees?: {
    id: string;
    name: string;
    avatar: string;
  }[];
  comments?: number;
  attachments?: number;
  onClick?: (id: string) => void;
  isLastTask?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  name,
  dueDate,
  status,
  assignees = [],
  comments = 0,
  attachments = 0,
  onClick,
  isLastTask = false
}) => {
  // Function to get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in_progress':
        return 'bg-blue-500 text-white';
      case 'to_do':
        return 'bg-purple-500 text-white';
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
    <div 
      className={`flex justify-between ${isLastTask ? '' : 'border-b-gray-800 border-b-2'} p-4 mb-3 w-full cursor-pointer hover:bg-gray-750`}
      onClick={() => onClick && onClick(id)}
    >

      <div className='flex  space-x-3 items-center'>
      <div className="flex items-center justify-between ">
        <h3 className="font-medium text-white">{name}</h3>
      </div>

      <div className="flex space-x-3  text-gray-400 text-sm">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {comments}
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          {attachments}
        </div>
      </div>
          
    
      </div>
      
        
        <div className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeClass(status)}`}>
          {formatStatus(status)}
        </div>
      
      
    </div>
  );
};

export default TaskCard; 