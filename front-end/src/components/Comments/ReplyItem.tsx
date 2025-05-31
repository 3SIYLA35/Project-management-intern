import React, { useState } from 'react';
import { Reply, UserProfile } from '../../components/Profile/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEdit, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCommentContext } from '../../Contexts/CommentContext';

interface ReplyItemProps{
  reply: Reply;
  commentId: string;
  currentUser: UserProfile|null;
}

const ReplyItem: React.FC<ReplyItemProps>=({ reply, commentId, currentUser })=>{
  const [isEditing,setIsEditing]=useState(false);
  const [editText,setEditText]=useState(reply.content);
  const [showReplyToReply,setShowReplyToReply]=useState(false);
  const [replyText,setReplyText]=useState('');
  const commentContext=useCommentContext();
  const updateReply=commentContext?.updateReply;
  const deleteReply=commentContext?.deleteReply;
  const createReply=commentContext?.createReply;

  const handleUpdateReply=()=>{
    if (editText.trim() && updateReply){
      updateReply({
        ...reply,
        content: editText
      }, commentId);
      setIsEditing(false);
    }
  };

  const handleDeleteReply=()=>{
    if (window.confirm('Are you sure you want to delete this reply?') && deleteReply){
      deleteReply(reply.id,commentId);
    }
  };

  const handleReplyToReply=()=>{
    if (replyText.trim() && currentUser && createReply) {
      const newReply:Partial<Reply>={
        id: '',
        content:replyText,
        user:currentUser,
        parentReplyId:reply,
      };
      
      createReply(newReply,commentId);
      setReplyText('');
      setShowReplyToReply(false);
    }
  };

  const isOwner=currentUser?.id===reply.user.id;
  const formatDate=(date: Date)=>{
    return new Date(date).toLocaleString('en-US',{ 
      month:'short', 
      day:'numeric',
      hour:'2-digit',
      minute:'2-digit'
    });
  };

  return (
    <div className="flex mb-3">
      <img 
        src={reply.user.avatar || '/img/default-avatar.jpg'} 
        alt={reply.user.name} 
        className="w-7 h-7 rounded-full mr-2"
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
                onClick={handleUpdateReply}
                className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-xs"
              >
                Save
              </button>
              <button 
                onClick={()=>setIsEditing(false)}
                className="px-3 py-1 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        ):(
          <div className="bg-gray-800 rounded-lg p-2">
            <div className="flex justify-between items-start">
              <span className="text-white font-medium text-sm">{reply.user.name}</span>
              <span className="text-gray-400 text-xs">{formatDate(reply.createdAt)}</span>
            </div>
            <p className="text-gray-300 mt-1 text-sm">{reply.content}</p>
          </div>
        )}
        
        <div className="flex mt-1 space-x-3 text-xs text-gray-400">
          <button 
            className="hover:text-white flex items-center"
            onClick={()=>setShowReplyToReply(!showReplyToReply)}
          >
            <FontAwesomeIcon icon={faComment} className="text-[12px] mr-1" />
            Reply
          </button>
          
          {isOwner &&(
            <>
              <button 
                className="hover:text-white flex items-center"
                onClick={() => setIsEditing(true)}
              >
                <FontAwesomeIcon icon={faEdit} className="text-[12px] mr-1" />
                Edit
              </button>
              <button 
                className="hover:text-white flex items-center"
                onClick={handleDeleteReply}
              >
                <FontAwesomeIcon icon={faTrash} className="text-[12px] mr-1" />
                Delete
              </button>
            </>
          )}
          
        </div>
        
        {showReplyToReply&&(
          <div className="mt-2 flex">
            <img 
              src={currentUser?.avatar ||'/img/default-avatar.jpg'} 
              alt={currentUser?.name ||'User'} 
              className="w-5 h-5 rounded-full mr-2"
            />
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                onInput={(e)=>{
                  const textarea=e.currentTarget as HTMLTextAreaElement;
                  textarea.style.height='40px';
                  textarea.style.height=textarea.scrollHeight+'px';
                }}
              />
              <div className="flex justify-end space-x-2 mt-1">
                <button 
                  onClick={()=>setShowReplyToReply(false)}
                  className="px-2 py-1 text-gray-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleReplyToReply}
                  className="px-2 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-xs"
                  disabled={!replyText.trim()}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyItem;
