import { adaptComment, adaptCommentforapi, adaptreply, ReplyApi } from "../adapters/commentAdapter";
import { apiClient } from "./apiClient";
import { CommentApi as commentapi, adaptreplyforapi } from "../adapters/commentAdapter";
import { Comment, Reply } from "../components/Profile/types";

export const ProjectCommentApi = {
    getComments: async(projectId: string) => {
        try {
            const response = await apiClient.get<commentapi[]>(`/comments/project/${projectId}/get-comments`);
            if (response && Array.isArray(response)) {
                console.log('response from getProjectComments', response);
                return response.map(adaptComment);
            }
            return [];
        } catch (err) {
            console.error('error on fetch project comments', err);
            throw err;
        }
    },
    
    createComment: async(comment: Comment) => {
        try {
            const adaptedComment = adaptCommentforapi(comment);
            console.log('Sending to server:', adaptedComment);
            const response = await apiClient.post<commentapi>(`/comments/project/create-comment`, adaptedComment);
            
            if (response) {
                console.log('response from createProjectComment', response);
                return adaptComment(response);
            }
            console.warn('Received invalid response from server:', response);
            return {
                ...comment,
                id: 'temp-' + Date.now(),
            };
        } catch (err) {
            console.error('error on create project comment', err);
            throw err;
        }
    },
    
    updateComment: async(comment: Comment) => {
        try {
            const updatedComment = { id: comment.id, content: comment.content };
            const adaptedComment = adaptCommentforapi(updatedComment);
            console.log('Updating project comment:', adaptedComment);
            const response = await apiClient.put<commentapi>(`/comments/project/update-comment`, adaptedComment);
            if (response) {
                console.log('response from updateProjectComment', response);
                return adaptComment(response);
            }
            return comment;
        } catch (err) {
            console.error('error on update project comment', err);
            throw err;
        }
    },
    
    deleteComment: async(commentId: string) => {
        try {
            const response = await apiClient.delete<commentapi>(`/comments/project/delete-comment/${commentId}`);
            if (response) {
                console.log('response from deleteProjectComment', response);
                return adaptComment(response);
            }
            return { id: commentId } as Comment;
        } catch (err) {
            console.error('error on delete project comment', err);
            throw err;
        }
    },
    
    createReply: async(reply: Partial<Reply>, commentId: string) => {
        try {
            const adaptedReply = adaptreplyforapi(reply);
            console.log('Creating reply for project comment:', adaptedReply);
            const response = await apiClient.post<ReplyApi>(
                `/comments/project/comment/${commentId}/reply/create-reply`,
                adaptedReply
            );
            if (response) {
                console.log('response from createReply for project comment', response);
                return adaptreply(response);
            }
            return {
                ...reply,
                id: 'temp-' + Date.now(),
                createdAt: new Date(),
                updatedAt: new Date()
            } as Reply;
        } catch (err) {
            console.error('error on create reply for project comment', err);
            throw err;
        }
    },
    
    updateReply: async(reply: Reply, commentId: string) => {
        try {
            const updatedReply = { id: reply.id, content: reply.content };
            const adaptedReply = adaptreplyforapi(updatedReply);
            console.log('Updating reply for project comment:', adaptedReply);
            const response = await apiClient.put<ReplyApi>(
                `/comments/project/comment/reply/update-reply`,
                adaptedReply
            );
            if (response) {
                console.log('response from updateReply for project comment', response);
                return adaptreply(response);
            }
            return reply;
        } catch (err) {
            console.error('error on update reply for project comment', err);
            throw err;
        }
    },
    
    deleteReply: async(replyId: string, commentId: string) => {
        try {
            const response = await apiClient.delete<ReplyApi>(
                `/comments/project/comment/${commentId}/reply/delete-reply/${replyId}`
            );
            if (response) {
                console.log('response from deleteReply for project comment', response);
                return adaptreply(response);
            }
            return { id: replyId } as Reply;
        } catch (err) {
            console.error('error on delete reply for project comment', err);
            throw err;
        }
    }
}; 