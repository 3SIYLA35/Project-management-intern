import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import TaskForm from './TaskForm';
import { useTaskContext } from '../../Contexts/TaskContext';

interface AddTaskButtonProps {
  onTaskAdded: (task: any) => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onTaskAdded }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const taskContext=useTaskContext();

  
  const handleOpenForm=()=>{
    console.log('isFormOpen',isFormOpen);
    setIsFormOpen(true);
  };
  
  const handleCloseForm=()=>{
    setIsFormOpen(false);
  };
  
  const handleSaveTask = (task: any) => {
    onTaskAdded(task);
  };
  
  return (
    <>
      <button 
        className="flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        onClick={handleOpenForm}
      >
        <IoAdd className="mr-1" /> Add Task
      </button>
      
      {isFormOpen && (
        <TaskForm 
          onClose={handleCloseForm} 
          onSave={handleSaveTask}
          isopen={isFormOpen} 
        />
      )}
    </>
  );
};

export default AddTaskButton; 