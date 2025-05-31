import React, { useState } from 'react';
import { Comment, Reply, UserProfile } from '../../components/Profile/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEdit, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCommentContext } from '../../Contexts/CommentContext';
import ReplyItem from './ReplyItem';

interface CommentItemProps {
  comment: Comment;
  currentUser: UserProfile | null;
}

const CommentItem: React.FC<CommentItemProps>=({ comment,currentUser})=>{
  const [showReplyInput,setShowReplyInput]=useState(false);
  const [replyText,setReplyText]=useState('');
  const [isEditing,setIsEditing]=useState(false);
  const [editText,setEditText]=useState(comment.content);
  const commentContext=useCommentContext();
  const updateComment=commentContext?.updateComment;
  const deleteComment=commentContext?.deleteComment;
  const createReply=commentContext?.createReply;

  const handleReplySubmit=()=>{
    if (replyText.trim() && currentUser && createReply){
      const newReply:Partial<Reply>={
        id:'',
        content:replyText,
        user:currentUser,
        parentReplyId:null,
        replyLevel:1,
      };
      
      createReply(newReply,comment.id);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  const handleUpdateComment=()=>{
    if (editText.trim() && updateComment){
      updateComment({
        ...comment,
        content:editText
      });
      setIsEditing(false);
    }
  };

  const handleDeleteComment=()=>{
    if (window.confirm('Are you sure you want to delete this comment?') && deleteComment){
      deleteComment(comment.id);
    }
  };

  const isOwner=currentUser?.id===comment.user.id;
  
  
  const formatDate=(date: Date)=>{
    return new Date(date).toLocaleString('en-US', { 
      month:'short', 
      day:'numeric',
      hour:'2-digit',
      minute:'2-digit'
    });
  };

  return (
    <div className="flex mb-4">
      <img 
        src={comment.user.avatar || '/img/default-avatar.jpg'} 
        alt={comment.user.name} 
        className="w-8 h-8 rounded-full mr-3"
      />
      <div className="flex-1">
        {isEditing?(
          <div className="mb-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onInput={(e)=>{
                const textarea=e.currentTarget as HTMLTextAreaElement;
                textarea.style.height='70px';
                textarea.style.height=textarea.scrollHeight+'px';
              }}
            />
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={handleUpdateComment}
                className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Save
              </button>
              <button 
                onClick={()=>setIsEditing(false)}
                className="px-3 py-1 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        ):(
          <div className="bg-gray-800 rounded-lg p-3 mb-2">
            <div className="flex justify-between items-start">
              <span className="text-white font-medium">{comment.user.name}</span>
              <span className="text-gray-400 text-xs">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-gray-300 mt-1">{comment.content}</p>
          </div>
        )}
        
        <div className="flex mt-1 space-x-3 text-xs text-gray-400">
          <button 
            className="hover:text-white flex items-center"
            onClick={()=>setShowReplyInput(!showReplyInput)}
          >
            <FontAwesomeIcon icon={faComment} className="text-[13px] mr-1" />
            Reply
          </button>
          
          {isOwner&&(
            <>
              <button 
                className="hover:text-white flex items-center"
                onClick={()=>setIsEditing(true)}
              >
                <FontAwesomeIcon icon={faEdit} className="text-[13px] mr-1" />
                Edit
              </button>
              <button 
                className="hover:text-white flex items-center"
                onClick={handleDeleteComment}
              >
                <FontAwesomeIcon icon={faTrash} className="text-[13px] mr-1" />
                Delete
              </button>
            </>
          )}
          
        </div>
        
        {showReplyInput&&(
          <div className="mt-2 flex">
            <img 
              src={currentUser?.avatar || '/img/default-avatar.jpg'} 
              alt={currentUser?.name || 'User'} 
              className="w-6 h-6 rounded-full mr-2"
            />
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={2}
              />
              <div className="flex justify-end space-x-2 mt-1">
                <button 
                  onClick={() => setShowReplyInput(false)}
                  className="px-3 py-1 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleReplySubmit}
                  className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  disabled={!replyText.trim()}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Render replies */}
        {comment.replies && comment.replies.length>0 && (
          <div className="ml-8 mt-2 space-y-3">
            {comment.replies.map((reply)=>(
              <ReplyItem 
                key={reply.id} 
                reply={reply}
                commentId={comment.id} 
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
