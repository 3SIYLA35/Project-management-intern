import { adaptComment, adaptCommentforapi, adaptreply, ReplyApi } from "../adapters/commentAdapter";
import { apiClient } from "./apiClient";
import { CommentApi as commentapi ,adaptreplyforapi} from "../adapters/commentAdapter";
import { Comment, Reply } from "../components/Profile/types";




export const CommentApi={
    getComments:async(taskId:string)=>{
        try{
            const response=await apiClient.get<commentapi[]>(`/comments/task/${taskId}/get-comments`);
            if(response && Array.isArray(response)){
                console.log('response from getComments',response);
                return response.map(adaptComment);
            }
            return [];

        }catch(err){
            console.error('error on fetch comments',err);
            throw err;
        }
    },
    createComment:async(comment:Comment)=>{
        try{
            const adaptedComment=adaptCommentforapi(comment);
            console.log('Sending to server:', adaptedComment);
            const response=await apiClient.post<commentapi>(`/comments/task/create-comment`, adaptedComment);
            
            if(response){
                console.log('response from createComment', response);
                return adaptComment(response);
            }
                console.warn('Received invalid response from server:', response);
                return {
                    ...comment,
                    id:'temp-' +Date.now(),
                };
            

        }catch(err){
            console.error('error on create comment',err);
            throw err;
        }

    },
    updateComment:async(comment:Comment)=>{
        try{
            const updatedcomment={id:comment.id,content:comment.content};
            const adaptedComment=adaptCommentforapi(updatedcomment);
            console.log('Updating comment:',adaptedComment);
            const response=await apiClient.put<commentapi>(`/comments/task/update-comment`, adaptedComment);
            if(response ){
                console.log('response from updateComment',response);
                return adaptComment(response);
            }
            return comment;
        }catch(err){
            console.error('error on update comment',err);
            throw err;
        }
    },
    deleteComment:async(commentId:string)=>{
        try{
            const response=await apiClient.delete<commentapi>(`/comments/task/delete-comment/${commentId}`);
            if(response ){
                console.log('response from deleteComment',response);
                return adaptComment(response);
            }
            return { id: commentId }as Comment;
        }catch(err){
            console.error('error on delete comment',err);
            throw err;
        }
    },
    createReply:async(reply:Partial<Reply>,commentId:string)=>{
        try{
            const adaptedReply=adaptreplyforapi(reply);
            console.log('Creating reply:', adaptedReply);
            const response=await apiClient.post<ReplyApi>(
                `/comments/task/comment/${commentId}/reply/create-reply`,
                adaptedReply
            );
            if(response){
                console.log('response from createReply',response);
                return adaptreply(response);
            }
            return{
                ...reply,
                id:'temp-'+Date.now(),
                createdAt:new Date(),
                updatedAt:new Date()
            } as Reply;
        }catch(err){
            console.error('error on create reply',err);
            throw err;
        }
    },
    updateReply:async(reply:Reply,commentId:string)=>{
        try{
            const adaptedReply=adaptreplyforapi(reply);
            console.log('Updating reply:', adaptedReply);
            const response = await apiClient.put<ReplyApi>(
                `/comments/task/comment/reply/update-reply`,
                adaptedReply
            );
            if(response){
                console.log('response from updateReply',response);
                return adaptreply(response);
            }
            return reply;
        }catch(err){
            console.error('error on update reply',err);
            throw err;
        }
    },
    deleteReply:async(replyId:string,commentId:string)=>{
        try{
            const response=await apiClient.delete<ReplyApi>(`/comments/task/comment/${commentId}/reply/delete-reply/${replyId}`);
            if(response ){
                console.log('response from deleteReply',response);
                return adaptreply(response);
            }
            return { id:replyId} as Reply;
        }catch(err){
            console.error('error on delete reply',err);
            throw err;
        }
    }
}