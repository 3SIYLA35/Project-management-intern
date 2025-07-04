import React, { useEffect, useState, useRef } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowsUpDownLeftRight, faBarsProgress, faChartLine, faComment, faCopy, faEye, faFaceSmile, faPaperclip, faPaperPlane, faShare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { IoIosAddCircleOutline } from "react-icons/io";
import Emojipicker, { EmojiClickData } from 'emoji-picker-react';
import EmojiPicker from 'emoji-picker-react';
import { Comment, Task } from '../../components/Profile/types';
import Editmodal from '../../components/Main components/editmodal';
import { Attachment } from '../../components/Profile/types';
import { useTaskContext } from '../../Contexts/TaskContext';
import AttachmentModal from '../../components/Main components/AttachmentModal';
import CommentSection from '../../components/Comments/CommentSection';
import { useProfileContext } from '../../Contexts/ProfileContext';
import { useCommentContext } from '../../Contexts/CommentContext';



interface TaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  comments:Comment[];
}

const TaskDetailPanel: React.FC<TaskDetailProps> = ({ isOpen, onClose, task ,comments}) => {
  const [emojipickeropen,setemojipickeropen]=useState(false);
  const [isEditing,setisEditing]=useState(false);
  const [editfield,seteditfield]=useState('');
  const [editvalue,seteditvalue]=useState('');
  const taskCOntext=useTaskContext();
  const updatetask=taskCOntext?.updatetask;
  const [localtask,setlocaltask]=useState<Task|null>(task);
  const tasks=taskCOntext?.tasks;
  const fileRef = useRef<HTMLInputElement>(null);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen]=useState(false);
  const deleteattachments=taskCOntext?.deleteattachments;
  const commentContext=useCommentContext();
  const fetchcomments=commentContext?.fetchcomments;
  const commentsList=commentContext?.comments || [];
  
  const handlesaveedit=()=>{
    const updattedtask:Partial<Task>={
      [editfield]:editvalue
    }
      updatetask(updattedtask,task.id)
      .then(()=>{
        const updatedTask=taskCOntext?.tasks?.find(t=>t.id===task.id);
        if(updatedTask){
          setlocaltask(updatedTask);
        }
      });
    
    setisEditing(false);
  }

  useEffect(()=>{
    setlocaltask(task);

    if(task){
      fetchcomments(task.id);
    }

  },[task]);

  // Add a new useEffect to update local task when tasks change
  useEffect(() => {
    if (tasks) {
      const updatedTask = tasks.find(t => t.id === task.id);
      if (updatedTask) {
        setlocaltask(updatedTask);
      }
    }
  }, [tasks, task.id]);

  const handleEmojiClick=(event:EmojiClickData)=>{
    console.log(event);
    
    setemojipickeropen(false);
  }
  useEffect(()=>{
   if(task){
     console.log('task is updated ',task);
   }
  },[task]);
  if (!isOpen || !task) return null;

  const handleAddAttachments=(newAttachments: Attachment[])=>{
      const updatedTask:Attachment[]=newAttachments;
      console.log('updatedTask',updatedTask);
      updatetask(localtask||{},localtask?.id,updatedTask||[])
        .then(()=>{
          const updated=taskCOntext?.tasks?.find(t=>t.id===task.id);
          if(updated){
            setlocaltask(updated);
          }
        });
    
  };

  const handleaddAttachment=()=>{
    setIsAttachmentModalOpen(true);
  };

  return (
    <div className="h-full  overflow-y-auto hover:hide-scrollbar hide-scrollbar ">
      <div className="">
        {/* Header with close button */}
        <div className=" px-6 pt-6 flex justify-between items-center mb-4">
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

        {/* Add to Card Button */}
        <div className='flex justify-between h-20  bg-gray-700  items-center  p-6 '>
         <div className="">
          <button className="bg-purple-500 text-white font-bold px-3 py-2 rounded-md flex items-center hover:bg-purple-200 hover:text-purple-500 hover:border-purple-500 hover:border-2 border-purple-500">
            <span className="text-white font-semibold  text-lg mr-2 hover:text-purple-500">+</span>
            Add To Card
          </button>
         </div>
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <button className="bg-gray-700 flex items-center  h-10 w-20 text-white pl-[8px] pr-[8px] justify-between py-1 rounded hover:bg-gray-600">
            
            <FontAwesomeIcon  className='text-[13px]' icon={faArrowsUpDownLeftRight}></FontAwesomeIcon>
                        <span className='text-lg'> Move </span>
            
              </button>
            <button className="bg-gray-700 h-10 w-20 flex items-center  text-white pl-[8px] pr-[8px] justify-between py-1 rounded hover:bg-gray-600">
            <FontAwesomeIcon icon={faCopy} className='text-[13px]'/>
              <span className='text-lg'> Copy </span>
              </button>
            <button className="bg-gray-700 h-10 w-20 flex items-center  text-white pl-[6px] pr-[6px] justify-between py-1 rounded hover:bg-gray-600">
            <FontAwesomeIcon icon={faEye} className='text-[13px]'/>
              <span className='text-lg'> Public </span>
              </button>
          </div>
        </div>
        </div>
        {/* Task Name */}
        <div className="mb-6 px-6 pt-2">
          <div className="flex items-center">
           <FontAwesomeIcon icon={faBarsProgress} className='text-[15px] mr-2'/>
            <h3 className="text-white text-lg font-medium">Task Name</h3>
            <button className="ml-2 text-gray-400 hover:text-white" 
            onClick={()=>{
              setisEditing(true);
              seteditfield('name');
            }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="text-white mt-2 ml-4">{localtask?.name} with web designing</p>
        </div>

        {/* Description */}
        <div className="mb-6 px-6">
          <div className="flex items-center">
           <FontAwesomeIcon icon={faNoteSticky} className='text-[15px] mr-2'/> 
            <h3 className="text-white text-lg font-medium">Description</h3>
            <button className="ml-2 text-gray-400 hover:text-white"
            onClick={()=>{
              setisEditing(true);
              seteditfield('description');
            }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="text-gray-300 mt-2 ml-4">
            {localtask?.description || 'Choose from profitable SaaS startups, vetted by the platform. Review key metrics to find the right fit. Negotiate directly with founders, without the costly middlemen. Most deals close within 30 days.'}
          </p>
        </div>

        {/* Assignment Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 px-6">
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Assigned By</h4>
            <div className="flex items-center">
              <img src={localtask?.assignedBy?.avatar || "/img/avatar-1.jpg"} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
              <span className="text-gray-300">{localtask?.assignedBy?.name || "Ronak Chaitwal"}</span>
            </div>
          </div>
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Assignee</h4>
            <div className="flex items-center">
              <img src={localtask?.assignedTo?.avatar || "/img/avatar-2.jpg"} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
              <span className="text-gray-300">{localtask?.assignedTo?.name || "Kajol Kashyap"}</span>
            </div>
          </div>
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Due Date</h4>
            <span className="text-gray-300">{new Date(localtask?.dueDate || '').toLocaleDateString(
              'en-US',
              {year:'numeric',
              month:'long',
              day:'numeric'
            }
            )}</span>
          </div>
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Priority</h4>
            <span className="text-red-400">{localtask?.priority || "High Priority"}</span>
          </div>
        </div>

        {/* Attachments */}
        <div className="mb-6 px-6">
          <div className="flex items-center mb-3">
            <img src="/icons/attach-document.png" className='w-[15px] h-[15px] mr-2' alt="" />
            <h3 className="text-white text-lg font-medium">Attachment</h3>
            <button className="ml-2 text-gray-300 hover:text-white"
             onClick={handleaddAttachment}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="1em" height="1em">
                <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224H272v74.5c0 8.8-7.2 16-16 16-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3V272h-74.5c-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3 0-8.8 7.2-16 16-16H240v-74.5c0-8.8 7.2-16 16-16s16 7.2 16 16V240h74.5c8.8 0 16 7.2 16 16s-7.2 16-16 16z"/>
              </svg>
            </button>
          </div>
          
          {localtask?.attachment && localtask.attachment.length > 0 ? (
            localtask.attachment.map((attachment, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-3 mb-3 ml-4">
                <div className="flex">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center text-yellow-600 mr-3 overflow-hidden">
                    {attachment.type.startsWith('image/') ? (
                      <img 
                        src={attachment.url} 
                        alt={attachment.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-medium">{attachment.name}</h4>
                    <p className="text-gray-400 text-xs">Added {new Date(attachment.date).toLocaleDateString()} at {new Date(attachment.time).toLocaleTimeString()}</p>
                    <div className="flex justify-between mt-4 text-sm pt-2 border-t-[1px] border-gray-400">
                      <div className="flex space-x-3">
                        <button className="text-gray-400 hover:text-white">
                          <FontAwesomeIcon icon={faComment} className='text-[13px] mr-1' />
                          Comment
                        </button>
                        <button className="text-gray-400 hover:text-white">
                          <FontAwesomeIcon icon={faShare} className='text-[13px] mr-1' />
                          Share
                        </button>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-white"
                        onClick={() =>{
                          deleteattachments(attachment?.id||'',localtask||null)
                         
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} className='text-[13px] mr-1' />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic ml-4">No attachments yet</div>
          )}
        </div>
                <CommentSection task={localtask as Task} comments={commentsList} />
      </div>
      <Editmodal
        isOpen={isEditing}
        onclose={()=>{setisEditing(false);}}
        fieldname={editfield}
        value={editvalue}
        onChange={(value)=>{
          seteditvalue(value);
        }}
        onsave={handlesaveedit}
      ></Editmodal>
      
      <AttachmentModal
        isOpen={isAttachmentModalOpen}
        onClose={() => setIsAttachmentModalOpen(false)}
        onSave={handleAddAttachments}
        taskId={localtask || null}
        currentUser={localtask?.assignedBy}
      />
    </div>
  );
};

export default TaskDetailPanel;