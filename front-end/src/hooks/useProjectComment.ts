import { ProjectCommentApi } from "../api/ProjectCommentApi";
import { useEffect, useState } from "react";
import { Comment, Reply } from "../components/Profile/types";

export const useProjectComment=()=>{
    const [comments,setComments]=useState<Comment[]>([]);
    const [loading,setLoading]=useState<boolean>(false);
    const [error,setError]=useState<string|null>(null);

    const fetchComments=async(projectId: string)=>{
        try {
            setLoading(true);
            setError(null);
            const response=await ProjectCommentApi.getComments(projectId);
            if(response && Array.isArray(response)){
                console.log('comments from useProjectComment',response);
                setComments(response);
                return response;
            }else{
                setComments([]);
            }
        }catch(err){
            console.error('error on fetch project comments',err);
            setError('Failed to fetch project comments');
        }finally{
            setLoading(false);
        }
    }
    
    const createComment=async(comment:Comment)=>{
        try {
            setLoading(true);
            const optimisticComment={...comment};
            setComments(prev=>[...prev,optimisticComment]);
            const response=await ProjectCommentApi.createComment(comment);
            if(response){
                console.log('response from createComment',response);
                setComments(prev=>{
                    const hasOptimistic=prev.some(c=>c.id===optimisticComment.id);
                    if(hasOptimistic){
                        return prev.map(c=>c.id==optimisticComment.id?response:c);
                    }else{
                        return[...prev,response];
                    }
                });
                return response;
            }
            return optimisticComment;
        }catch (err){
            console.error('error on create project comment', err);
            setError('Failed to create project comment');
            setComments(prev => prev.filter(c => c.id !== comment.id));
            throw err;
        }finally{
            setLoading(false);
        }
    }
    
    const updateComment=async(comment:Comment)=>{
        try {
            setLoading(true);
            setError(null);
            setComments(prev=>prev.map(c=>c.id==comment.id?comment as Comment:c));
            const response=await ProjectCommentApi.updateComment(comment);
            if(response){
                console.log('response from updateComment',response);
                setComments(prev=>prev.map(c=>c.id==comment.id?response:c));
                return response;
            }
            return comment;
        }catch(err){
            console.error('error on update project comment', err);
            setError('Failed to update project comment');
            setComments(prev=>{
                const original=prev.find(c=>c.id==comment.id);
                if(!original) return prev;
                return prev.map(c=>c.id==comment.id?original:c);
            });
            throw err;
        }finally{
            setLoading(false);
        }
    }
    
    const deleteComment=async(commentId:string)=>{
        const commentToDelete=comments.find(c=>c.id==commentId);
        try {
            setLoading(true);
            setError(null);
            setComments(prev=>prev.filter(c=>c.id!==commentId));
            const response=await ProjectCommentApi.deleteComment(commentId);
            if(response){
                console.log('response from deleteComment',response);
                return response;
            }
            return {id:commentId} as Comment;
        }catch(err){
            console.error('error on delete project comment', err);
            setError('Failed to delete project comment');
            if(commentToDelete) setComments(prev=>[...prev,commentToDelete]);
            throw err;
        }finally{
            setLoading(false);
        }
    }
    
    const createReply=async(reply:Partial<Reply>,commentId:string)=>{
        try {
            setLoading(true);
            setError(null);
            const optimisticReply={
                ...reply,
                id:reply.id||'temp-' + Date.now(),
                createdAt:new Date(),
                updatedAt:new Date()
            } as Reply;
            setComments(prev=>prev.map(comment=>
                comment.id==commentId?
                {...comment,replies:[...comment.replies,optimisticReply]}:comment
            ));
            const response=await ProjectCommentApi.createReply(reply,commentId);
            if (response) {
                console.log('response from createReply', response);
                setComments(prev=>prev.map(comment=>
                    comment.id==commentId?
                    {...comment,
                        replies:comment.replies.map(r=>
                                r.id==optimisticReply.id?response:r
                            )
                        }
                        :comment
                ));
                return response;
            }
            return optimisticReply;
        }catch(err){
            console.error('error on create reply for project comment', err);
            setError('Failed to create reply');
            setComments(prev=>prev.map(comment=> 
                comment.id==commentId?
                {...comment,
                    replies:comment.replies.filter(r=>r.id!==reply.id)
                    }
                    : comment
            ));
            
            throw err;
        }finally{
            setLoading(false);
        }
    }
    
    const updateReply=async(reply:Reply,commentId:string)=>{
        try {
            setLoading(true);
            setError(null);
            setComments(prev=>prev.map(comment=>
                comment.id==commentId?
                {...comment,
                    replies:comment.replies.map(r=>r.id==reply.id?reply:r)
                    }
                    : comment
            ));
            const response=await ProjectCommentApi.updateReply(reply, commentId);
            if (response) {
                console.log('response from updateReply',response);
                setComments(prev=>prev.map(comment=>
                    comment.id==commentId?
                    {...comment,
                        replies:comment.replies.map(r=>r.id==reply.id?response:r)
                        }
                        : comment
                ));
                return response;
            }
            return reply;
        }catch(err){
            console.error('error on update reply for project comment',err);
            setError('Failed to update reply');
            setComments(prev=>prev.map(comment=>
                comment.id==commentId?
                {...comment,
                    replies:comment.replies.map(r=>r.id==reply.id?reply:r)
                    }
                : comment
            ))
            throw err;
        } finally {
            setLoading(false);
        }
    }
    
    const deleteReply=async(replyId: string,commentId:string)=>{
        try {
            setLoading(true);
            setError(null);
            setComments(prev=>prev.map(comment=>
                comment.id==commentId?
                {...comment,
                    replies:comment.replies.filter(r=>r.id!==replyId)
                    }
                : comment
            ))
            const response=await ProjectCommentApi.deleteReply(replyId, commentId);
            if(response){
                console.log('response from deleteReply', response);
                return response;
            }
            return{ id: replyId } as Reply;
        }catch(err){
            console.error('error on delete reply for project comment', err);
            setError('Failed to delete reply');
            setComments(prev=>prev.map(comment=>
                comment.id==commentId?
                {...comment,
                    replies:comment.replies.filter(r=>r.id!==replyId)
                    }
                : comment
            ))
            throw err;
        }finally{
            setLoading(false);
        }
    }
    
    return {
        comments,
        loading,
        error,
        fetchComments,
        createComment,
        updateComment,
        deleteComment,
        createReply,
        updateReply,
        deleteReply
    }
} 