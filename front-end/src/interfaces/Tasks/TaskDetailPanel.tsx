import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowsUpDownLeftRight, faBarsProgress, faChartLine, faComment, faCopy, faEye, faFaceSmile, faPaperclip, faPaperPlane, faShare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { IoIosAddCircleOutline } from "react-icons/io";
import Emojipicker, { EmojiClickData } from 'emoji-picker-react';
import EmojiPicker from 'emoji-picker-react';

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

interface TaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    name: string;
    description?: string;
    status: 'completed' | 'in_progress' | 'not_started';
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
    dueDate?: string;
    priority?: string;
    attachments?: number;
    activities?: Activity[];
  } | null;
}

const TaskDetailPanel: React.FC<TaskDetailProps> = ({ isOpen, onClose, task }) => {
  const [emojipickeropen,setemojipickeropen]=useState(false);

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
            <button className="ml-2 text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="text-white mt-2 ml-4">{task.name} with web designing</p>
        </div>

        {/* Description */}
        <div className="mb-6 px-6">
          <div className="flex items-center">
           <FontAwesomeIcon icon={faNoteSticky} className='text-[15px] mr-2'/> 
            <h3 className="text-white text-lg font-medium">Description</h3>
            <button className="ml-2 text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="text-gray-300 mt-2 ml-4">
            {task.description || 'Choose from profitable SaaS startups, vetted by the platform. Review key metrics to find the right fit. Negotiate directly with founders, without the costly middlemen. Most deals close within 30 days.'}
          </p>
        </div>

        {/* Assignment Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 px-6">
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Assigned By</h4>
            <div className="flex items-center">
              <img src={task.assignedBy?.avatar || "/img/avatar-1.jpg"} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
              <span className="text-gray-300">{task.assignedBy?.name || "Ronak Chaitwal"}</span>
            </div>
          </div>
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Assignee</h4>
            <div className="flex items-center">
              <img src={task.assignee?.avatar || "/img/avatar-2.jpg"} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
              <span className="text-gray-300">{task.assignee?.name || "Kajol Kashyap"}</span>
            </div>
          </div>
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Due Date</h4>
            <span className="text-gray-300">{task.dueDate || "25th February, 2020"}</span>
          </div>
          <div>
            <h4 className="text-gray-400 text-sm mb-2">Priority</h4>
            <span className="text-red-400">{task.priority || "High Priority"}</span>
          </div>
        </div>

        {/* Attachments */}
        <div className="mb-6 px-6">
          <div className="flex items-center  mb-3">
            <img src="/icons/attach-document.png"  className='w-[15px] h-[15px] mr-2' alt="" />
            <h3 className="text-white text-lg font-medium">Attachment</h3>
            <button className="ml-2 text-gray-300 hover:text-white">
             
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="1em" height="1em">
                  <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224H272v74.5c0 8.8-7.2 16-16 16-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3V272h-74.5c-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3 0-8.8 7.2-16 16-16H240v-74.5c0-8.8 7.2-16 16-16s16 7.2 16 16V240h74.5c8.8 0 16 7.2 16 16s-7.2 16-16 16z"/>
                </svg>
             
            </button>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-3 mb-3 ml-4">
            <div className="flex">
              <div className="bg-yellow-200 w-16 h-17 rounded-lg flex items-center justify-center text-yellow-600 mr-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium">Process Illustration.jpg</h4>
                <p className="text-gray-400 text-xs">Added 29th January, 2020 at 04:00 PM</p>
                <div className="flex justify-between mt-4 text-sm pt-2 border-t-[1px] border-gray-400">
                  <div className="flex space-x-3">
                    <button className="text-gray-400 hover:text-white">
                      <FontAwesomeIcon icon={faComment} className='text-[13px] mr-1' />
                      Comment</button>
                    <button className="text-gray-400 hover:text-white">
                      <FontAwesomeIcon icon={faShare} className='text-[13px] mr-1' />
                      Share</button>
                    
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <FontAwesomeIcon icon={faTrash} className='text-[13px] mr-1' />
                    Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Activities Section */}
        <div className="mb-6 px-6">
          <div className='flex items-center mb-3 '>
           <FontAwesomeIcon icon={faChartLine} className='pr-2'/>
           <h3 className="text-white text-lg font-medium ">Activities</h3>
          </div>
          
          {/* User Status */}
          <div className=" rounded-lg p-3 mb-4   ">
           <div className='flex items-center'>
            <img src="/img/avatar-1.jpg" alt="Avatar" className="w-9 relative bottom-2  h-9 rounded-full mr-2" />
            <div className='flex flex-col w-full'>
             <div className="flex justify-between items-start  pt-2 pr-5 pl-7 h-[55px]  bg-violet-900 pl-4 rounded-tl-lg custom-rounded-tr-tl">
              <div className="flex items-center">
                <span className="text-white">Ronak is out of office</span>
              </div>
              <button className="text-white hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
             </div>
             <div className="flex p-1  items-center relative bottom-5 bg-white  px-4 custom-rounded">
              <textarea 
                placeholder="Ask a question or send any update" 
                className="flex-1  bg-transparent text-black rounded-lg px-3 py-2 focus:outline-none h-10"
                onInput={(e) => {
                  const textarea=e.target as HTMLTextAreaElement;
                  textarea.style.height='10px';
                  textarea.style.height=`${textarea.scrollHeight}px`;
                }}
              />
              <button className="ml-2  text-violet-900 bg-gray-200 rounded-full border-2 h-7 w-7 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
             </div>
            </div>
           </div>
           <div className='pl-16 relative bottom-3' >
             <button className='text-gray-300 hover:text-white'>
              <FontAwesomeIcon icon={faPaperclip} className='text-[18px] '/>
             </button>
             <button className='text-gray-300 hover:text-white'
             onClick={()=>{
              setemojipickeropen(!emojipickeropen);
             }}>
              <FontAwesomeIcon icon={faFaceSmile} className='text-[18px] ml-4 ' />
               
             </button>
              {emojipickeropen? 
              <div className=''>
                <EmojiPicker open={emojipickeropen} width={390} height={200} skinTonesDisabled={true}  searchDisabled={true} onEmojiClick={handleEmojiClick}></EmojiPicker>
              </div>:''}
           </div>

                <div className='w-full h-[2px] mx-2 bg-gray-700'></div>
          </div>

          
          {/* Activity Comments */}
          <div className="space-y-4">
            <div className="flex">
              <img src="/img/avatar-2.jpg" alt="Avatar" className="w-8 h-8 rounded-full mr-3" />
              <div className="flex-1">
                <p className="text-gray-300">
                  <span className="text-white font-medium">Adding a new comment to Pricing illustration.</span> Have you seen samples?
                </p>
                <div className="flex mt-2 space-x-2">
                  <div className="bg-gray-700 w-16 h-16 rounded-md overflow-hidden">
                    <img src="/img/sample1.jpg" alt="Sample" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-gray-700 w-16 h-16 rounded-md overflow-hidden">
                    <img src="/img/sample2.jpg" alt="Sample" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-gray-700 w-16 h-16 rounded-md overflow-hidden">
                    <img src="/img/sample3.jpg" alt="Sample" className="w-full h-full object-cover" />
                  </div>
                  <button className="flex items-center justify-center bg-gray-700 w-8 h-16 rounded-md text-white">
                    +2
                  </button>
                </div>
                <div className="flex mt-2 space-x-3 text-xs text-gray-400">
                  <button className="hover:text-white">
                  <FontAwesomeIcon icon={faComment} className='text-[13px] mr-1' />
                    Reply</button>
                  <button className="hover:text-white">
                  <FontAwesomeIcon icon={faShare} className='text-[13px] mr-1' />
                    Share</button>
                </div>
              </div>
            </div>
            
            <div className="flex ml-12">
              <img src="/img/avatar-3.jpg" alt="Avatar" className="w-8 h-8 rounded-full mr-3" />
              <div className="flex-1">
                <p className="text-gray-300">
                  <span className="text-white font-medium">Please see this artwork created from an website.</span>
                </p>
                <div className="flex mt-2 space-x-2">
                  <button className="text-gray-400 hover:text-white text-xs">
                  <FontAwesomeIcon icon={faComment} className='text-[13px] mr-1' />
                    Reply</button>
                  <button className="text-gray-400 hover:text-white text-xs">
                  <FontAwesomeIcon icon={faShare} className='text-[13px] mr-1' />  
                    Share</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default TaskDetailPanel;