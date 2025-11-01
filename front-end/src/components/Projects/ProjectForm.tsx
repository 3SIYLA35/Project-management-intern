import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Member } from '../../models/interfaces';
import { Project } from '../Profile/types';
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Select } from '@radix-ui/react-select';
import { useProjectContext } from '../../Contexts/ProjectContext';
import { useProfile } from '../../hooks/useProfile';

interface ProjectModalprops{
  showmodal:boolean;
  togglemodal:()=>void;
  sourcepage:string;
}



const ProjectForm: React.FC<ProjectModalprops>=({
  showmodal,
  togglemodal,
  sourcepage
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep]=useState(1);
  const Userscontext=useProfile();
  const {employees}=Userscontext;
  const {createproject}=useProjectContext();
  const [formData, setFormData]=useState<Project|null>(
    {
    name: '',
    description: '',
    startDate: new Date().toLocaleDateString('en-US',{
      year:'numeric',
      month:'long',
      day:'numeric'
    }),
    endDate: new Date().toLocaleDateString('en-US',{
      year:'numeric',
      month:'long',
      day:'numeric'
    }),
    color: 'purple',
    members: [],
    
    owner: {
      id: '',
      name: '',
      email: '',
      avatar: '',
      role: '',
      department: '',
      joinDate: '',
      skills: [],
      lastLogin: new Date(),
      timeZone: '',
    },
    daysLeft: 0,
    progress: 0,
    id: '',
    role: '',
    status: 'in_progress',
    totalTasks: 0,
    completedTasks: 0,
    createdAt: '',

  }
);
  
  // Step 1: Project Details
  const renderProjectDetails=()=>{
    return(
    

    <div className="space-y-6 ">
      <h3 className="text-lg font-medium text-gray-200">Project Details</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Project Name</label>
        <input
          type="text"
          // value={formData?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="mt-1 text-gray-200 block w-full bg-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter project name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          value={formData?.description || ' '}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          className="mt-1 block w-full text-gray-200 bg-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe your project"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Start Date</label>
          <input
            type="date"
            
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="mt-1 block w-full focus:text-gray-200 placeholder bg-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder='mm/dd/yyyy'
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">End Date</label>
          <input
            type="date"
            onChange={(e) => handleChange('endDate', e.target.value)}
            className="mt-1 block w-full placeholder:text-gray-400 bg-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder='dd/mm/yyyy'
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">Color Theme</label>
        <div className="flex space-x-4">
          {['purple', 'blue', 'green', 'red', 'yellow'].map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleChange('color', color)}
              className={`h-8 w-8 rounded-full border-2 ${
                formData?.color === color ? 'border-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: getColorHex(color) }}
            />
          ))}
        </div>
      </div>
    </div>
  );}
  
  

  const handleimageerror=(e:React.SyntheticEvent<HTMLImageElement>)=>{
    e.currentTarget.src='/img/default-avatar.webp';
  }
  
  // Step 3: Team Members
  const renderTeamMembers=()=>{
    const availableMembers=employees;
    console.log('available members in renderTeamMembers',availableMembers);

    
    const handleToggleMember=(member: Member)=>{
      const isSelected=(formData?.members || []).some(m => m.id === member.id);
      
      if (isSelected) {
        handleChange('members', (formData?.members || []).filter(m => m.id !== member.id));
      } else {
        handleChange('members', [...(formData?.members || []), member]);
      }
    };
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-200">Add Team Members</h3>
        
        <p className="text-sm text-gray-100">
          Select team members to collaborate with on this project
        </p>
        
        <div className="space-y-2">
          {availableMembers.map(member => (
            <div 
              key={member.id}
              className={`flex items-center p-3  rounded-lg cursor-pointer ${
                (formData?.members || []).some(m => m.id === member.id)
                  ? 'border border-purple-500 bg-gray-700'
                  : ' bg-gray-700 hover:border-purple-300'
              }`}
              onClick={() => handleToggleMember(member)}
            >
              <div className="flex-shrink-0">
                <img src={member.avatar} alt="" className="h-10 w-10 rounded-full" onError={handleimageerror} />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm text-gray-200 font-medium">{member.name}</h4>
                <p className="text-sm text-gray-100">{member.email}</p>
              </div>
              <input 
                type="checkbox" 
                checked={(formData?.members || []).some(m => m.id === member.id)} 
                onChange={() => {}} 
                className="h-5 w-5 text-purple-600 rounded border-gray-300"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  //   <div className="space-y-4">
  //     <h3 className="text-lg font-medium text-gray-200">Set Up Initial Tasks</h3>
      
  //     <p className="text-sm text-gray-100">
  //       Define some initial tasks to get started with this project
  //     </p>
      
  //     <div className="space-y-3">
  //       {[1, 2, 3].map((taskNum) => (
  //         <div key={taskNum} className="border border-gray-200 rounded-lg p-4">
  //           <input
  //             type="text"
  //             placeholder={`Task ${taskNum} title`}
  //             className="block w-full h-8 pl-2 rounded-md focus:border-2 focus:border-purple-500 focus:outline-none text-white border-0 bg-gray-700 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
  //           />
  //           <div className="flex justify-between mt-4">
  //             <div className="flex space-x-2">
  //               <select className="block w-full text-sm text-white  border-gray-300 bg-gray-700 focus:outline-none focus:border-2 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
  //                 <option >Low</option>
  //                 <option>Medium</option>
  //                 <option>High</option>
  //               </select>
  //               <select className="block w-full text-sm text-white text-white border-gray-300 bg-gray-700 focus:outline-none focus:border-2 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
  //                 <option>To Do</option>
  //                 <option>In Progress</option>
  //                 <option>Done</option>
  //               </select>
  //             </div>
  //             <button className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
  //               <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  //               </svg>
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  
  // Handle field changes
  const handleChange=(field: string,value: any)=>{
    console.log('field',field);
    console.log('value',value);
    if(formData){
      setFormData({
        ...formData,
        [field]:value
      })
    } 
  };
  
  // Next step
  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  // Previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Submit form
  const handleSubmit = () => {
    console.log('Project created:', formData);
    if(formData){
     createproject(formData);
    }
    navigate('/projects');
  };
  
  
  
  // Helper function for color hex values
  const getColorHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      blue: '#3b82f6',
      green: '#10b981',
      purple: '#8b5cf6',
      red: '#ef4444',
      yellow: '#f59e0b',
    };
    return colorMap[color] || '#8b5cf6';
  };
  
  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderProjectDetails();
      case 2:
        return renderTeamMembers();               
      default:
        return renderProjectDetails();
    }
  };
  
  if (!showmodal) return null;

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 z-50  flex flex-col items-center justify-center p-4 ">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full  max-w-2xl overflow-hidden ">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center">
            {currentStep > 1 && (
              <button 
                onClick={handlePrevStep}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-200">
              {currentStep === 1 && 'Create Project'}
              {currentStep === 2 && 'Team Members'}
            </h2>
          </div>
          <button 
            onClick={togglemodal}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        {/* Progress Indicator */}
        <div className="px-6 pt-4">
          <div className="flex justify-center mb-4">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-12 h-1 ${
                currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-200'
              }`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              
            </div>
          </div>
        </div>
        



        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] hide-scrollbar">
          {renderStep()}
        </div>
        
        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          {currentStep < 2 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
              disabled={!formData?.name && currentStep === 1}
            >
              Next
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;