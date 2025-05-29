import React, { useState, useEffect, useRef } from 'react';
import { IoAdd, IoArrowDown, IoClose } from 'react-icons/io5';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faSmile } from '@fortawesome/free-solid-svg-icons';
import './TaskForm.css';
import { Attachment, Project, Sprint, Task, UserProfile } from '../Profile/types';
import { useTaskContext } from '../../Contexts/TaskContext';
import { useProfileContext } from '../../Contexts/ProfileContext';
import { Select, SelectItem, SelectContent, SelectValue } from '../ui/select';
import { useProjectContext } from '../../Contexts/ProjectContext';
import {  SelectTrigger, Value } from '@radix-ui/react-select';
import { useSprintContext } from '../../Contexts/SprintContext';






interface TaskFormProps {
  onClose: () => void;
  onSave: (task: any) => void;
  isopen: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onSave, isopen }) => {
  
  const [checklist, setChecklist] = useState<string[]>(['Inbox-Template']);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const [showAssigneeSelector, setShowAssigneeSelector] = useState(false);
  
  const [assignedProject, setAssignedProject] = useState<Project | null>(null);
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const sprintContext=useSprintContext();
  const sprints=sprintContext?.sprints||null;

  const [task,setTask]=useState<Task|null>(null);
  const [attachments,setAttachments]=useState<Attachment[]>([]);
  const taskContext=useTaskContext();
  const {createTask}=taskContext;
  const profileContext=useProfileContext();
  const projectCOntext=useProjectContext();
  const projects=projectCOntext?.projects||null;
  const employees=profileContext?.employees||null;
  const UserContext=useProfileContext();
  const profile=UserContext?.profile||null;

  useEffect(()=>{
    // console.log('fetching employees',employees);
    console.log('sprints',sprints);
    if(isopen && !task){
      setTask({
        name:'',
        description:'',
        assignedTo:null,
        priority:'',
        sprintId:{
          id:'',
          name:'',
          projectId:{
            id:'',
            name:'',
            description:'',
            startDate:new Date(),
            endDate:new Date(),
            progress:0,
            owner:null as unknown as UserProfile,
            status:'',

          }as Project,
          startDate:new Date(),
          endDate:new Date(),
          status:'',
          goals:'',
        }as Sprint,
         projectId:null as unknown as Project,
        startDate:new Date(),
        dueDate:new Date(),
      } as Task)
    }
   

  },[sprints])

  
  
  const handleAddChecklistItem =() => {
    setChecklist([...checklist, '']);
  };
  
  const handleEmojiSelect = (emoji: any) => {
    // setDescription(description + emoji.native);
    // setShowEmojiPicker(false);
  };
  
  const handleAddAssignee=(user:UserProfile)=>{
    // if (!task?.assignedTo==null){
    console.log('user added',user);
    console.log('task',task);
      setTask(prev=>prev?{...prev,assignedTo:user}:null);

    // }

    setShowAssigneeSelector(false);
  };
  
  const handleRemoveAssignee=()=>{
    if(task){
      setTask(prev=>prev?{...prev,assignedTo:null}:null)
      setShowAssigneeSelector(true);
    }
  };
  
  const handlesprintchange=(value:string)=>{
    if(sprints){
      setTask(prev=>prev?{...prev,sprintId:sprints.find(sprint=>sprint.id===value)as Sprint}:null)
    }
  }
  const handleonchange=(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>|React.ChangeEvent<HTMLSelectElement>)=>{
    setTask(prev=>prev?{...prev,[e.target.name]:e.target.value}:null);
  }
  
  const handleSelectProject=(project:Project)=>{
    // if(!task?.projectId){
    setTask(prev=>prev?{...prev,projectId:project}:null);
    console.log('tas selected',task);
    console.log('project selected',task?.projectId);
    sprintContext?.getSprints(project.id);
    setShowProjectSelector(false);
  };
  const attachmentRef=useRef<HTMLInputElement>(null);
  const handleInutattachment=()=>{
    if(attachmentRef.current){
      attachmentRef.current.click();
    }
  }
  const handleaddAttachment=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const files=e.target.files;
    if(files && files.length>0){
      const file=files[0];
      if(file && file.size>0){
        const url=URL.createObjectURL(file);
        const filename=file.name;
        const filetype=file.type;
        const time=new Date().toISOString();
        const date=new Date().toLocaleDateString();
        setAttachments(prev=>prev?[
          ...prev,
          {
            name:filename,
            type:filetype,
            url:url,
            time:time,
            date:date,
            taskId:task?.id,
            uploadedBy:profile,
          },
        ] as Attachment[]:[]);
      }

    }
  }
  
  const handleSaveTask=()=>{
     createTask(task!,attachments);
    
    onSave(task);
    onClose();
  };

  if (!isopen) return null;
  
  return (
    <div className="task-form-container">
      <div className="animate-slide-down bg-gray-800 rounded-lg w-full max-w-md mx-4 overflow-hidden">
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
           name='name'
            onChange={(e) => handleonchange(e)}
          />
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <p className="text-xs font-medium text-gray-500 mb-1">ASSIGNED TO</p>
              <div className="flex items-center flex-wrap gap-2">
                {task?.assignedTo ? (
                 
                    <div  className="flex items-center bg-gray-600 text-white rounded-full pr-2 overflow-hidden">
                      <img src={task?.assignedTo?.avatar} alt={task?.assignedTo?.name} className="w-6 h-6 rounded-full mr-1" />
                      <span className="text-xs">{task?.assignedTo?.name}</span>
                      <button 
                        className="ml-1 text-gray-500 hover:text-red-500"
                        onClick={() => {
                         
                          handleRemoveAssignee()}}
                      >
                        <IoClose size={16} />
                      </button>
                    </div>
                  
                ) : (
                  <button 
                    className="text-gray-400 hover:text-blue-500"
                    onClick={() => {
                      setShowAssigneeSelector(!showAssigneeSelector);
                    }}
                  >
                    <IoAdd />
                  </button>
                )}
                
              </div>
              
              {showAssigneeSelector && (
                <div className="absolute mt-1 z-10 bg-gray-700 hide-scrollbar text-white rounded shadow-lg border border-gray-600 max-h-48 w-full overflow-y-auto">
                  {employees?.map(user => (
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
                
                onChange={(e) => handleonchange(e)}
                name='priority'
              >
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
              </select>
            </div>
          </div>
          
          
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">START DATE</p>
              <div className="flex items-center rounded-lg">
                <input
                  type="date"
                  className="p-1 w-full bg-gray-600 text-white rounded-lg border-none"
                  onChange={(e) => handleonchange(e)}
                />
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">DUE DATE</p>
              <div className="flex items-center rounded-lg">
                <input
                  type="date"
                  className="p-1 w-full bg-gray-600 text-white rounded-lg border-none"
                  
                  onChange={(e) => handleonchange(e)}
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
                  const textarea = e.currentTarget as HTMLTextAreaElement;
                  textarea.style.height='20px';
                  textarea.style.height=textarea.scrollHeight+'px';
                }}
                name='description'
                placeholder="Add a description..."
                onChange={(e) => handleonchange(e)}
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

          <div className='grid grid-cols-2 gap-4'>
          {/* assigned project*/}
             <div className="mb-4 relative">
            <p className="text-xs font-medium text-gray-500 mb-1">ASSIGNED PROJECT</p>
            <div className="flex items-center">
              {task?.projectId ? (
                <div className="flex items-center justify-between w-full bg-gray-600 text-white px-3 py-1 rounded">
                  <span>{task?.projectId?.name}</span>
                  <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => setTask(prev=>prev?{...prev,projectId:null as unknown as Project}:null)}
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  className="text-gray-400 flex items-center hover:text-blue-500"
                  onClick={() => setShowProjectSelector(!showProjectSelector)}
                >
                  <IoAdd className='mr-1'/> Link to Project
                </button>
              )}
            </div>
            
            {showProjectSelector && (
              <div className="absolute mt-1 z-10 bg-gray-700 text-white rounded shadow-lg border border-gray-600 max-h-48 w-full overflow-y-auto">
                {projects?.map(project => (
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
          {/* Sprint*/}
             <div className="mb-4 relative">
            <p className="text-xs font-medium text-gray-500 mb-1">PHASE</p>
            <div className="flex items-center">
              
                <div className="flex items-center justify-between h-8 w-full text-semibold bg-gray-600 text-white  rounded">
                   
                  <Select onValueChange={(value)=>handlesprintchange(value)}>
                     <SelectTrigger className=' w-full rounded-md flex items-center pl-2 '>
                       <SelectValue placeholder='Select a phase' className='text-[10px]'>{ task?.sprintId?.name?.length && task?.sprintId?.name?.length >22 ?
                         task?.sprintId?.name?.slice(0,22)+' ...' 
                         : task?.sprintId?.name ||'Select a phase'}</SelectValue>
                     </SelectTrigger>
                     
                     
                        <SelectContent className='text-white bg-gray-800'>
                          {sprints?.map(sprint=>

                        <SelectItem key={sprint.id} value={sprint.id}>{sprint.name}</SelectItem>
                          )}
                      </SelectContent>
                  </Select>
                 
                </div>
            </div>
            
           
            </div>
          </div>
          
          
          
          {/* Attachment*/}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-1">ATTACHMENTS</p>
            <button className="flex items-center text-sm text-gray-500 hover:text-blue-500 "
            onClick={handleInutattachment}
            >
              <IoAdd className="mr-1" /> Add Attachment
              <input type="file"
              ref={attachmentRef}
              className='hidden'
              accept='image/*,video/*,file/*,pdf/*' 
              onChange={handleaddAttachment}
               />
            </button>
          </div>
          {/* Display Attachments */}
           {attachments.length > 0 && (
             <div className="mb-4 mt-2">
               <p className="text-xs font-medium text-gray-500 mb-2">Selected Attachments</p>
               <div className="grid grid-cols-4 gap-2">
                 {attachments.map((attachment, index) => (
                   <div key={index} className="flex relative  h-20 justify-between bg-gray-700 p-2 rounded" 
                   style={{backgroundImage:`url(${attachment.url})`,backgroundSize:'cover',backgroundPosition:'center'}}
                   >
                     
                       
                       <span className="text-xs text-white truncate max-w-[150px]">{attachment.name}</span>
                     
                     <button 
                       className="text-gray-400 absolute top-1 right-1  font-semibold hover:text-red-500"
                       onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                     >
                       <IoClose size={16} />
                     </button>
                   </div>
                 ))}
               </div>
             </div>
           )}



          
          <div className="border-t pt-4">
            <div className="flex border-b border-gray-600">
              <button className="text-gray-200 pb-2 font-medium mr-4">COMMENTS</button>
            </div>
            
            <div className="mt-4 relative bg-gray-600 rounded-lg p-2">
              <textarea
                placeholder="Add Comment..."
                className="w-full hide-scrollbar rounded-lg bg-gray-600 outline-none border-b-transparent border-b border-gray-200 pb-2 focus:outline-none"
                onInput={(e)=>{
                  const textarea = e.currentTarget as HTMLTextAreaElement;
                  textarea.style.height='30px';
                  textarea.style.height=textarea.scrollHeight+'px';
                }}
              />
              <div className="flex justify-between items-center">
                <button className="bg-gray-800 rounded-lg font-semibold text-white px-4 py-1 rounded text-sm">
                  Comment
                </button>
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
        
        <div className="flex justify-end p-4">
          <button 
            className="px-4 py-2 mr-2 rounded border rounded-lg w-[115px] bg-gray-100 text-gray-600 font-semibold border-1 border-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="bg-black text-white font-semibold rounded-lg border-gray-600 w-[115px] hover:bg-gray-700 px-4 py-2 rounded"
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