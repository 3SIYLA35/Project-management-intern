import React, { useState, useEffect } from 'react';
import { Comment, Project, Task, UserProfile } from '../../components/Profile/types';
import { useCommentContext } from '../../Contexts/CommentContext';
import { useProfileContext } from '../../Contexts/ProfileContext';
import CommentItem from './CommentItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faPaperPlane, faPaperclip, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

interface CommentSectionProps{
  task: Task;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps>=({ task, comments })=>{
  const [newComment,setNewComment]=useState('');
  const [showEmojiPicker,setShowEmojiPicker]=useState(false);
  const commentContext=useCommentContext();
  const createComment=commentContext?.createComment;
  const profileContext=useProfileContext();
  const currentUser=profileContext?.profile;
  
  const handleSubmitComment=()=>{
    if (newComment.trim() && currentUser && createComment){
      try{
        const comment:Comment={
          id:'temp-'+Date.now(),
          content:newComment,
          taskId:task,
          projectId:{} as Project,
          user:currentUser,
          replies:[],
          createdAt:new Date(),
          updatedAt:new Date()
        };
        setNewComment('');
        createComment(comment).catch(error =>{
          console.error('Failed to create comment', error);
        });
      }catch(error){
        console.error('Failed to create comment', error);
      }
    }
  };
  
  const handleKeyDown=(e: React.KeyboardEvent)=>{
    if (e.key === 'Enter' && !e.shiftKey){
      e.preventDefault();
      handleSubmitComment();
    }
  };
  
  const sortedComments=[...comments]
    .filter(comment=>!comment.id.includes('temp-')||comment.id.startsWith('temp-'))
    .sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime());

  return (
    <div className="mb-6 px-6">
      <div className='flex items-center mb-3'>
        <FontAwesomeIcon icon={faChartLine} className='pr-2'/>
        <h3 className="text-white text-lg font-medium">Comments</h3>
      </div>
      
      {/* Comment input */}
      <div className="flex mb-4">
        <img 
          src={currentUser?.avatar ||'/img/default-avatar.jpg'} 
          alt={currentUser?.name ||'User'} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-1 relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment..."
            className="w-full hide-scrollbar p-2 rounded-lg bg-gray-600 outline-none border-b-transparent border-b border-gray-200 pb-2 focus:outline-none"
                onInput={(e)=>{
                  const textarea=e.currentTarget as HTMLTextAreaElement;
                  textarea.style.height='70px';
                  textarea.style.height=textarea.scrollHeight+'px';
                }}
          />
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <button className="text-gray-500 hover:text-gray-200">
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button 
              className="text-gray-500 hover:text-gray-200"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
            <button 
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className={`p-1 rounded-full ${newComment.trim() ?'text-purple-600 hover:text-purple-700 cursor-pointer' :'text-gray-400'}`}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
      
      {/* comments list */}
      <div className="space-y-4 mt-6">
        {sortedComments && sortedComments.length>0? (
          sortedComments.map(comment=>(
            <CommentItem 
              key={comment.id} 
              comment={comment}
              currentUser={currentUser ||null}
            />
          ))
        ):(
          <div className="text-gray-500 italic text-center py-4">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
