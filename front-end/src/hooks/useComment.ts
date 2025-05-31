import { CommentApi } from "../api/Commentapi";
import { useEffect, useState } from "react";
import { Comment, Reply } from "../components/Profile/types";

export const useComment=()=>{
    const [comments,setcomments]=useState<Comment[]>([]);
    const [loading,setloading]=useState<boolean>(false);
    const [error,seterror]=useState<string|null>(null);

    const fetchcomments=async(taskid:string)=>{
        try{
            setloading(true);
            seterror(null);
            const response=await CommentApi.getComments(taskid);
            if(response && Array.isArray(response)){
                console.log('comments from useComment',response);
                setcomments(response);
                return response;
            } else {
                setcomments([]);
            }
        }catch(err){
            console.error('error on fetch comments',err);
            seterror('Failed to fetch comments');
        } finally {
            setloading(false);
        }
    }
    
    const createComment=async(comment:Comment)=>{
        try{
            setloading(true);
            const optimisticComment={...comment};
            setcomments(prev=>[...prev,optimisticComment]);
            const response=await CommentApi.createComment(comment);
            if(response){
                console.log('response from createComment',response);
                setcomments(prev =>{
                    const hasOptimistic=prev.some(c=>c.id===optimisticComment.id);
                    if (hasOptimistic){
                        return prev.map(c=>c.id===optimisticComment.id ? response : c);
                    }else{
                        return [...prev, response];
                    }
                });
                
                return response;
            }
            return optimisticComment;
        }catch(err){
            console.error('error on create comment',err);
            seterror('Failed to create comment');
            // Remove the optimistic comment on error
            setcomments(prev => prev.filter(c => c.id !== comment.id));
            throw err;
        } finally {
            setloading(false);
        }
    }
    
    const updateComment=async(comment:Comment)=>{
        try{
            setloading(true);
            seterror(null);
            setcomments(prev=>prev.map(c=>c.id===comment.id?comment as Comment:c));
            const response=await CommentApi.updateComment(comment);
            if(response){
                console.log('response from updateComment',response);
                setcomments(prev=>prev.map(c=>c.id===comment.id?response:c));
                return response;
            }
            return comment;
        }catch(err){
            console.error('error on update comment',err);
            seterror('Failed to update comment');
            setcomments(prev=>{
                const original=prev.find(c=>c.id===comment.id);
                if(!original)return prev;
                return prev.map(c=>c.id===comment.id?original:c);
            });
            throw err;
        } finally {
            setloading(false);
        }
    }
    
    const deleteComment=async(commentId:string)=>{
        // Store the comment for potential rollback
        const commentToDelete = comments.find(c => c.id === commentId);
        
        try{
            setloading(true);
            seterror(null);
            
            // Optimistically remove from UI
            setcomments(prev => prev.filter(c => c.id !== commentId));
            
            const response=await CommentApi.deleteComment(commentId);
            
            if(response){
                console.log('response from deleteComment',response);
                return response;
            }
            return { id: commentId } as Comment;
        }catch(err){
            console.error('error on delete comment',err);
            seterror('Failed to delete comment');
            
            // Restore the comment if we have it
            if (commentToDelete) {
                setcomments(prev => [...prev, commentToDelete]);
            }
            
            throw err;
        } finally {
            setloading(false);
        }
    }
    
    const createReply=async(reply:Partial<Reply>,commentId:string)=>{
        try{
            setloading(true);
            seterror(null);
            const optimisticReply={
                ...reply,
                id: reply.id||'temp-' + Date.now(),
                createdAt:new Date(),
                updatedAt:new Date()
            } as Reply;
            setcomments(prev=>prev.map(comment=> 
                comment.id===commentId 
                    ?{...comment,replies:[...comment.replies,optimisticReply]}
                    :comment
            ));
            
            const response=await CommentApi.createReply(reply,commentId);
            if(response){
                console.log('response from createReply',response);
                setcomments(prev=>prev.map(comment => 
                    comment.id===commentId
                        ?{
                            ...comment, 
                            replies:comment.replies.map(r=> 
                                r.id===optimisticReply.id?response:r
                            )
                        }
                        :comment
                ));
                return response;
            }
            return optimisticReply;
        }catch(err){
            console.error('error on create reply',err);
            seterror('Failed to create reply');
            setcomments(prev=>prev.map(comment=> 
                comment.id===commentId
                    ?{
                        ...comment,
                        replies:comment.replies.filter(r=>r.id!==reply.id)
                    }
                    :comment
            ));
            
            throw err;
        } finally {
            setloading(false);
        }
    }
    
    const updateReply=async(reply:Reply,commentId:string)=>{
        try{
            setloading(true);
            seterror(null);
            
            // Optimistically update in UI
            setcomments(prev => prev.map(comment => 
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: comment.replies.map(r => r.id === reply.id ? reply : r)
                    }
                    : comment
            ));
            
            const response=await CommentApi.updateReply(reply,commentId);
            
            if(response){
                console.log('response from updateReply',response);
                setcomments(prev => prev.map(comment => 
                    comment.id === commentId
                        ? {
                            ...comment,
                            replies: comment.replies.map(r => r.id === reply.id ? response : r)
                        }
                        : comment
                ));
                return response;
            }
            return reply;
        }catch(err){
            console.error('error on update reply',err);
            seterror('Failed to update reply');
            
            // Could add rollback logic here if needed
            
            throw err;
        } finally {
            setloading(false);
        }
    }
    
    const deleteReply=async(replyId:string,commentId:string)=>{
        // Store for potential rollback
        let replyToDelete: Reply | undefined;
        
        try{
            setloading(true);
            seterror(null);
            
            // Find and remove the reply, storing it for potential rollback
            setcomments(prev => {
                const updatedComments = prev.map(comment => {
                    if (comment.id === commentId) {
                        replyToDelete = comment.replies.find(r => r.id === replyId);
                        return {
                            ...comment,
                            replies: comment.replies.filter(r => r.id !== replyId)
                        };
                    }
                    return comment;
                });
                return updatedComments;
            });
            
            const response=await CommentApi.deleteReply(replyId,commentId);
            
            if(response){
                console.log('response from deleteReply',response);
                return response;
            }
            return { id: replyId } as Reply;
        }catch(err){
            console.error('error on delete reply',err);
            seterror('Failed to delete reply');
            
            // Restore the reply if deletion failed and we have a valid reply to restore
            if (replyToDelete) {
                setcomments(prev => prev.map(comment => {
                    if (comment.id === commentId && replyToDelete) {
                        return {
                            ...comment, 
                            replies: [...comment.replies, replyToDelete as Reply]
                        };
                    }
                    return comment;
                }));
            }
            
            throw err;
        } finally {
            setloading(false);
        }
    }
    
    return{
        comments,
        loading,
        error,
        fetchcomments,
        createComment,
        updateComment,
        deleteComment,
        createReply,
        updateReply,
        deleteReply
    }
}