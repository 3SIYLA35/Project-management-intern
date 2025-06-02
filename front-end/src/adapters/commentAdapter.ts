import { Comment, Project, Reply, Task, UserProfile } from "../components/Profile/types";
import { adaptTask, taskApi } from "./taskAdapter";
import { adaptuserProfile, addaptProfileforapi } from "./profileAdapter";
import { ApiUserprofile } from "./profileAdapter";
import { adaptTaskForAPi} from "./taskAdapter";
import { ApiProject, adaptprojectforapi } from "./projectAdapter";


export interface ReplyApi{
    _id:string;
    content:string;
    user:ApiUserprofile;
    parentReplyId:ReplyApi|null;
    replyLevel:number;
    createdAt:Date;
    updatedAt:Date;
}

export interface CommentApi{
    _id:string;
    content:string;
    taskId:taskApi;
    projectId:ApiProject;
    user:ApiUserprofile;
    replies:ReplyApi[];
    createdAt:Date;
    updatedAt:Date;
}


export const adaptComment=(comment: CommentApi):Comment=>{
    try {
        return{
            id:comment._id,
            content:comment.content || '',
            taskId:comment.taskId ? safetaskadapter(comment.taskId) : {} as Task,
            projectId:comment.projectId ? safeProjectAdapter(comment.projectId) : {} as Project,
            user:safeUserAdapter(comment.user),
            replies:comment.replies?comment.replies.map(reply=>{
                try {
                    return adaptreply(reply);
                } catch (error) {
                    console.warn('Error adapting reply', error);
                    return {} as Reply;
                }
            }):[],
            createdAt: comment.createdAt || new Date(),
            updatedAt: comment.updatedAt || new Date(),
        };
    }catch(error){
        console.error('error adapting comment', error);
        return {
            id: comment._id || '',
            content: comment.content || '',
            taskId:{} as Task,
            projectId:{} as Project,
            user:{} as UserProfile,
            replies:[],
            createdAt:new Date(),
            updatedAt:new Date(),
        };
    }
}

export const adaptreply=(reply: ReplyApi):Reply=>{
    try {
        return {
            id: reply._id,
            content: reply.content || '',
            user: safeUserAdapter(reply.user),
            parentReplyId:!reply.parentReplyId?null:adaptreply(reply.parentReplyId) as Reply,
            replyLevel:reply.replyLevel || 1,
            createdAt:reply.createdAt || new Date(),
            updatedAt:reply.updatedAt || new Date(),
        };
    }catch(error){
        console.error('error adapting reply', error);
        return {
            id:reply._id || '',
            content:reply.content || '',
            user:safeUserAdapter(reply.user),
            parentReplyId:null,
            replyLevel:1,
            createdAt:new Date(),
            updatedAt:new Date(),
        };
    }
}

const safetaskadapter=(task: any):any=>{
  if(typeof task==='string'){
    return {task:{ _id: task}};
  }
  if(task && task.id && !task.task){
    return {task:{_id: task.id}};
  }
  
  try {
    return adaptTaskForAPi(task);
  } catch (error) {
    console.warn('Error adapting task, using ID only', error);
    return {task:{_id:task.id||task._id||''}};
  }
};

const safeProjectAdapter = (project: any): any => {
  if (typeof project === 'string') {
    return { _id: project };
  }
  if (project && project.id) {
    return { _id: project.id };
  }
  
  try {
    return adaptprojectforapi(project);
  } catch (error) {
    console.warn('Error adapting project, using ID only', error);
    return { _id: project.id || project._id || '' };
  }
};

const safeUserAdapter=(user:any):any=>{
  if(typeof user==='string'){
    return {_id: user};
  }
  if(user && user.id){
    try{
      return addaptProfileforapi(user);
    }catch(error){
      console.warn('Error adapting user, using ID only', error);
      return { _id: user.id };
    }
  }else if(user && user._id){
    try{
      return adaptuserProfile(user);
    }catch(error){
      console.warn('Error adapting user, using ID only', error);
      return {_id: user.id};
    }
  }
  
  return {_id:''};
};

export const adaptCommentforapi=(comment:Partial<Comment>):Partial<CommentApi>=>{
    const apiComment:Partial<CommentApi>={
        _id:comment.id,
    }
    if(comment.content!==undefined) apiComment.content=comment.content;
    if(comment.taskId!==undefined) apiComment.taskId=safetaskadapter(comment.taskId);
    if(comment.projectId!==undefined) apiComment.projectId=safeProjectAdapter(comment.projectId);
    if(comment.user!==undefined) apiComment.user=safeUserAdapter(comment.user);
    if(comment.createdAt!==undefined) apiComment.createdAt=comment.createdAt;
    if(comment.updatedAt!==undefined) apiComment.updatedAt=comment.updatedAt;


    return apiComment;
}

export const adaptreplyforapi=(reply:Partial<Reply>):Partial<ReplyApi>=>{
    const apiReply:Partial<ReplyApi>={
    }
    if(reply.id!==undefined) apiReply._id=reply.id;
    if(reply.content!==undefined) apiReply.content=reply.content;
    if(reply.user!==undefined) apiReply.user=safeUserAdapter(reply.user);
    if(reply.parentReplyId!==undefined) apiReply.parentReplyId= reply.parentReplyId==null?null:adaptreplyforapi(reply.parentReplyId) as ReplyApi;
    if(reply.replyLevel!==undefined) apiReply.replyLevel=reply.replyLevel;
    if(reply.createdAt!==undefined) apiReply.createdAt=reply.createdAt;
    if(reply.updatedAt!==undefined) apiReply.updatedAt=reply.updatedAt;

    return apiReply;
}

