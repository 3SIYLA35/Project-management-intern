import React, { useState, useEffect } from 'react';
import { Comment, Project, Task, UserProfile } from '../../components/Profile/types';
import { useProjectCommentContext } from '../../Contexts/ProjectCommentContext';
import { useProfileContext } from '../../Contexts/ProfileContext';
import ProjectCommentItem from './ProjectCommentItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faPaperPlane, faPaperclip, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

interface ProjectCommentSectionProps {
  project: Project;
  comments: Comment[];
}
const ProjectCommentSection: React.FC<ProjectCommentSectionProps> = ({ project, comments }) => {
  const [newComment,setNewComment]=useState('');
  const [showEmojiPicker,setShowEmojiPicker]=useState(false);
  const [localComments,setLocalComments]=useState<Comment[]>([]);
  const commentContext=useProjectCommentContext();
  const createComment=commentContext?.createComment;
  const profileContext=useProfileContext();
  const currentUser=profileContext?.profile;
  //updating comment when comment props change
  useEffect(()=>{
    setLocalComments(comments);
  }, [comments]);
  
  const handleSubmitComment=()=>{
    if(newComment.trim() && currentUser&&createComment){
      try {
        const optimisticComment:Comment={
          id:'temp-'+Date.now(),
          content:newComment,
          taskId:{} as Task,
          projectId:project,
          user:currentUser,
          replies:[],
          createdAt:new Date(),
          updatedAt:new Date()
        };
        setLocalComments(prev =>[...prev, optimisticComment]);
        setNewComment('');
        createComment(optimisticComment).catch(error=>{
          console.error('Failed to create project comment', error);
          setLocalComments(prev => prev.filter(c=>c.id!==optimisticComment.id));
        });
      }catch(error){
        console.error('Failed to create project comment',error);
      }
    }
  };
  const handleKeyDown=(e:React.KeyboardEvent)=>{
    if(e.key==='Enter' && !e.shiftKey){
      e.preventDefault();
      handleSubmitComment();
    }
  };
  const sortedComments=[...localComments]
    .filter(comment=>!comment.id.includes('temp-')||comment.id.startsWith('temp-'))
    .sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime());
  
  return(
    <div className="mb-6 px-6">
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={faChartLine} className="text-[15px] mr-2" />
        <h3 className="text-white text-lg font-medium">Comments</h3>
      </div>

      {/* comment List */}
      <div className="mt-4 ml-4">
        {sortedComments.length>0? (
          sortedComments.map(comment=>(
            <ProjectCommentItem
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
            />
          ))
        ):(
          <div className="text-gray-400 italic">No comments yet</div>
        )}
      </div>

      {/* Add Comment Form */}
      <div className="mt-6 ml-4">
        <div className="relative bg-gray-700 rounded-lg overflow-hidden">
          <textarea
            className="w-full bg-transparent border-0 text-white px-4 py-3 pr-16 resize-none focus:ring-0 focus:outline-none"
            placeholder="Add a comment..."
            rows={3}
            value={newComment}
            onChange={(e)=>setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <button 
              className="text-gray-400 hover:text-white"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button 
              className="text-blue-500 hover:text-blue-400"
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCommentSection; 