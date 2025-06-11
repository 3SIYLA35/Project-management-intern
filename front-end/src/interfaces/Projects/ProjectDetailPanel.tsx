import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDownLeftRight, faBarsProgress, faChartLine, faComment, faCopy, faEye, faFaceSmile, faPaperclip, faPaperPlane, faShare, faTrash, faUsers, faCalendarAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky, faChartBar } from '@fortawesome/free-regular-svg-icons';
import { IoIosAddCircleOutline } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import { Project } from '../../components/Profile/types';
import Editmodal from '../../components/Main components/editmodal';
import { useProjectContext } from '../../Contexts/ProjectContext';
import ProjectCommentSection from '../../components/Comments/ProjectCommentSection';
import { useProjectCommentContext } from '../../Contexts/ProjectCommentContext';

interface Attachment {
  id: string;
  name: string;
  type: string;
  date: string;
  time: string;
}

interface Activity {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  type: 'message' | 'comment' | 'attachment';
  timestamp: string;
  replies?: {
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  }[];
}

interface ProjectDetailProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDetailPanel: React.FC<ProjectDetailProps>=({isOpen,onClose,project})=>{
  const [emojiPickerOpen, setEmojiPickerOpen]=useState(false);
  const [comment, setComment]=useState('');
  const [editmodalopen,seteditmodalopen]=useState(false);
  const [editfield,seteditfield]=useState<string|null>(null);
  const [editvalue,seteditvalue]=useState<string|null>(null);
  const projectContext=useProjectContext();
  const {updateproject}=projectContext;
  const [localproject,setlocalproject]=useState<Project|null>(project);
  useEffect(()=>{
    setlocalproject(project);
    
  },[project]);

  const [editedproject,seteditedproject]=useState<Partial<Project>|null>(null);

  const handleeditclick=(field:string,value:string)=>{
    seteditfield(field);
    seteditvalue(value);
    seteditmodalopen(true);
  }
  const handlesaveedit=()=>{
    console.log('editfield',editfield,editvalue);
    if(localproject && editfield ){
      console.log('id',localproject?.id);
      if(localproject?.id){
        // console.error('Project ID is required to update project');
        seteditedproject({[editfield]:editvalue});
        updateproject(localproject?.id,editedproject as Partial<Project>);
        setlocalproject(prev=>prev?{...prev,[editfield]:editvalue}:null);
      }
      seteditmodalopen(false);
    }
  }

  const handleEmojiClick=(emojiData: any)=>{
    setComment(comment + emojiData.emoji);
    setEmojiPickerOpen(false);
  };

  const projectCommentContext=useProjectCommentContext();
  const fetchComments=projectCommentContext?.fetchComments;
  const commentsList=projectCommentContext?.comments || [];
  const loading=projectCommentContext?.loading;
  const createComment=projectCommentContext?.createComment;
  const updateComment=projectCommentContext?.updateComment;
  const deleteComment=projectCommentContext?.deleteComment;
  const createReply=projectCommentContext?.createReply;
  const updateReply=projectCommentContext?.updateReply;
  const deleteReply=projectCommentContext?.deleteReply;
  const refreshComments=useCallback(()=>{
    if(project?.id){
      fetchComments?.(project.id);
    }
  },[project,fetchComments]);
  
 
  useEffect(()=>{
    refreshComments();
  },[project]);
  
 
  if(!isOpen || !project) return null;

  // calculate days remaining
  const today=new Date();
  const endDate=new Date(project.endDate);
  const daysRemaining=Math.ceil((endDate.getTime()-today.getTime())/(1000*60*60*24));
  const statusColor= 
    project.status==='completed' ? 'bg-green-500' : 
    project.status==='in_progress' ?'bg-yellow-500' : 
    'bg-red-500';

  return (
    <div className="h-full overflow-y-auto hover:hide-scrollbar hide-scrollbar">
      <div className="">
        {/* Header with close button */}
        <div className="px-6 pt-6 flex justify-between items-center mb-4">
          <div className="flex space-x-3">
            <button className="flex items-center text-gray-300 px-3 py-1 border border-1 border-gray-400 rounded hover:bg-gray-700">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mark Complete
            </button>
            <button className="text-violet-500 px-3 py-1 rounded hover:bg-gray-700">
              Send feedback
            </button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Project Actions */}
        <div className='flex justify-between h-20 bg-gray-700 items-center p-6'>
          <div className="">
            <button className="bg-purple-500 text-white font-bold px-3 py-2 rounded-md flex items-center hover:bg-purple-200 hover:text-purple-500 hover:border-purple-500 hover:border-2 border-purple-500">
              <span className="text-white font-semibold text-lg mr-2 hover:text-purple-500">+</span>
              Add Task
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-2">
              <button className="bg-gray-700 flex items-center h-10 w-20 text-white pl-[8px] pr-[8px] justify-between py-1 rounded hover:bg-gray-600">
                <FontAwesomeIcon className='text-[13px]' icon={faArrowsUpDownLeftRight} />
                <span className='text-lg'> Move </span>
              </button>
              <button className="bg-gray-700 h-10 w-20 flex items-center text-white pl-[8px] pr-[8px] justify-between py-1 rounded hover:bg-gray-600">
                <FontAwesomeIcon icon={faCopy} className='text-[13px]' />
                <span className='text-lg'> Copy </span>
              </button>
              <button className="bg-gray-700 h-10 w-20 flex items-center text-white pl-[6px] pr-[6px] justify-between py-1 rounded hover:bg-gray-600">
                <FontAwesomeIcon icon={faEye} className='text-[13px]' />
                <span className='text-lg'> Public </span>
              </button>
            </div>
          </div>
        </div>

        {/* Project Name */}
        <div className="mb-6 px-6 pt-2">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBarsProgress} className='text-[15px] mr-2' />
            <h3 className="text-white text-lg font-medium">Project Name</h3>
            <button className="ml-2 text-gray-400 hover:text-white"
             onClick={()=>handleeditclick('name',localproject?.name || '')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="text-white mt-2 ml-4">{localproject?.name}</p>
        </div>

        {/* Description */}
        <div className="mb-6 px-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faNoteSticky} className='text-[15px] mr-2' />
            <h3 className="text-white text-lg font-medium">Description</h3>
            <button className="ml-2 text-gray-400 hover:text-white"
            onClick={()=>handleeditclick('description',localproject?.description || '')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="text-gray-300 mt-2 ml-4">
            {localproject?.description || 'No description provided.'}
          </p>
        </div>

        {/* Project Progress */}
        <div className="mb-6 px-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faChartBar} className='text-[15px] mr-2' />
            <h3 className="text-white text-lg font-medium">Progress</h3>
          </div>
          <div className="mt-3 ml-4">
            <div className="flex justify-between mb-1">
              <span className="text-gray-300">{project.progress}% Complete</span>
              <span className="text-gray-300">{project.completedTasks}/{project.totalTasks} Tasks</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full bg-${project.color}-500`} 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 px-6">
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Project Owner</h4>
            <div className="flex items-center">
              <img src={localproject?.owner.avatar} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
              <span className="text-gray-300">{localproject?.owner.name}</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Status</h4>
            <span className={`text-white text-sm px-2 py-1 rounded-full ${statusColor}`}>
              {localproject?.status && localproject?.status?.replace('_', ' ').charAt(0).toUpperCase() + localproject?.status?.replace('_', ' ').slice(1)}
            </span>
          </div>
          
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Start Date</h4>
            <span className="text-gray-300">{new Date(project.startDate).toLocaleDateString()}</span>
          </div>
          
          <div>
            <h4 className="text-gray-400 text-sm mb-2">End Date</h4>
            <span className="text-gray-300">{new Date(project.endDate).toLocaleDateString()}</span>
          </div>
          
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Priority</h4>
            {/* <span className={`text-white text-sm px-2 py-1 rounded-full ${
              project?.priority === 'high' ? 'bg-red-500' : 
              project?.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`}>
              {project?.priority?.charAt(0).toUpperCase() + project?.priority?.slice(1)}
            </span> */}
          </div>
          
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Days Left</h4>
            <span className={`text-white text-sm px-2 py-1 rounded-full ${
              daysRemaining<=3 ?'bg-red-500': 
              daysRemaining<=7 ?'bg-yellow-500':'bg-green-500'
            }`}>
              {daysRemaining} Days
            </span>
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-6 px-6">
          <div className="flex items-center mb-3">
            <FontAwesomeIcon icon={faUsers} className='text-[15px] mr-2' />
            <h3 className="text-white text-lg font-medium">Team Members</h3>
            <button className="ml-2 text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="1em" height="1em">
                <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224H272v74.5c0 8.8-7.2 16-16 16-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3V272h-74.5c-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3 0-8.8 7.2-16 16-16H240v-74.5c0-8.8 7.2-16 16-16s16 7.2 16 16V240h74.5c8.8 0 16 7.2 16 16s-7.2 16-16 16z"/>
              </svg>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 ml-4">
            {localproject?.members?.map((member) => (
              <div key={member.id} className="flex items-center bg-gray-700 p-2 rounded">
                <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full mr-2" />
                <div>
                  <p className="text-white text-sm">{member.name}</p>
                  <p className="text-gray-400 text-xs">{member.email}</p>
                </div>
              </div>
            ))}
            {localproject?.members && localproject.members.length === 0 && (
              <p className="text-gray-400">No team members added yet.</p>
            )}
          </div>
        </div>

        {/* Task Overview */}
        <div className="mb-6 px-6">
          <div className="flex items-center mb-3">
            <FontAwesomeIcon icon={faTasks} className='text-[15px] mr-2' />
            <h3 className="text-white text-lg font-medium">Tasks</h3>
            <button className="ml-2 text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="1em" height="1em">
                <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224H272v74.5c0 8.8-7.2 16-16 16-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3V272h-74.5c-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3 0-8.8 7.2-16 16-16H240v-74.5c0-8.8 7.2-16 16-16s16 7.2 16 16V240h74.5c8.8 0 16 7.2 16 16s-7.2 16-16 16z"/>
              </svg>
            </button>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-3 ml-4">
            <div className="flex justify-between mb-2">
              <p className="text-white">Completed Tasks</p>
              <p className="text-white">{localproject?.completedTasks}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-white">Total Tasks</p>
              <p className="text-white">{localproject?.totalTasks}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-white">Remaining Tasks</p>
              <p className="text-white">{localproject?.totalTasks && localproject?.completedTasks && localproject?.totalTasks - localproject?.completedTasks}</p>
            </div>
          </div>
        </div>

        
      </div>
      <Editmodal
        isOpen={editmodalopen}
        onsave={handlesaveedit}
        onChange={(value:string)=>seteditvalue(value)}
        onclose={()=>seteditmodalopen(false)}
        fieldname={editfield || ''}
        value={editvalue || ''}
      />
      {/* show loading indicator for comments if needed */}
      {loading ? (
        <div className="px-6 py-4 text-center">
          <p className="text-gray-400">Loading comments...</p>
        </div>
      ) : (
        project && <ProjectCommentSection
         project={project} comments={commentsList} />
      )}
    </div>
  );
};

export default ProjectDetailPanel; 