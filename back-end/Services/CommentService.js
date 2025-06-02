const commentmodel=require('../Models/Comments.js');
const replymodel=require('../Models/reply.js');
const mongoose=require('mongoose');


const CommentService={
    getComments:async(taskId)=>{
        try{
            const comments=await commentmodel.find({taskId})
            .populate('user')
            .populate({
                path:'replies',
                populate:[
                    {path: 'user'},
                    { 
                        path:'parentReplyId',
                        populate:{path:'user'}
                    }
                ]
            });
            if(!comments){
                return [];
            }
            
            return comments;
        }catch(err){
            console.error('error on getComments',err);
            const error=new Error('Failed to get comments');
            error.status=500;
            error.message='Failed to get comments';
            error.name='CommentServiceError';
            throw error;
        }
    },
    
    getProjectComments:async(projectId)=>{
        try{
            const comments=await commentmodel.find({projectId})
            .populate('user')
            .populate({
                path:'replies',
                populate:[
                    {path: 'user'},
                    { 
                        path:'parentReplyId',
                        populate:{path:'user'}
                    }
                ]
            });
            if(!comments){
                return [];
            }
            
            return comments;
        }catch(err){
            console.error('error on getProjectComments',err);
            const error=new Error('Failed to get project comments');
            error.status=500;
            error.message='Failed to get project comments';
            error.name='CommentServiceError';
            throw error;
        }
    },
    
    createComment:async(commentdata)=>{
        try{
            console.log('commentdata',commentdata);
            const {taskId,content,user}=commentdata;
            const comment=await commentmodel.create({
                taskId:taskId.task._id,
                content,
                user:user._id,
            });
            if(!comment){
                return null;
            }
            const populatedComment=await commentmodel.findById(comment._id)
            .populate('user')
            .populate('taskId')
            .populate({
                path:'replies',
                populate:[
                    { path: 'user' },
                    { 
                        path: 'parentReplyId',
                        populate: { path: 'user' }
                    }
                ]
            });
            
            if(!populatedComment){
                return null;
            }
            return populatedComment;
        }catch(err){
            console.error('error on createComment',err);
            const error=new Error('Failed to create comment');
            error.status=500;
            error.message='Failed to create comment';
            error.name='CommentServiceError';
            throw error;
        }
    },
    
    createProjectComment:async(commentdata)=>{
        try{
            console.log('project commentdata',commentdata);
            const {projectId,content,user}=commentdata;
            const comment=await commentmodel.create({
                projectId:projectId._id,
                content,
                user:user._id,
            });
            if(!comment){
                return null;
            }
            const populatedComment=await commentmodel.findById(comment._id)
            .populate('user')
            .populate('projectId')
            .populate({
                path:'replies',
                populate:[
                    { path: 'user' },
                    { 
                        path: 'parentReplyId',
                        populate: { path: 'user' }
                    }
                ]
            });
            
            if(!populatedComment){
                return null;
            }
            return populatedComment;
        }catch(err){
            console.error('error on createProjectComment',err);
            const error=new Error('Failed to create project comment');
            error.status=500;
            error.message='Failed to create project comment';
            error.name='CommentServiceError';
            throw error;
        }
    },
    
    updateComment:async(commentid,commentdata)=>{
        try{
            console.log('commentid',commentid);
            const comment=await commentmodel.findByIdAndUpdate(
                commentid,
                {$set:commentdata}
            );
            if(!comment){
                return null;
            }
            const populatedComment=await commentmodel.findById(commentid)
            .populate('user')
            .populate('taskId')
            .populate('projectId')
            .populate({
                path:'replies',
                populate:[
                    {path:'user'},
                    { 
                        path:'parentReplyId',
                        populate:{path:'user'}
                    }
                ]
            });
            return populatedComment;

        }catch(err){
            console.error('error on updateComment',err);
            const error=new Error('Failed to update comment');
            error.status=500;
            error.message='Failed to update comment';
            error.name='CommentServiceError';
            throw error;
        }
    },
    deleteComment:async(commentid)=>{
        try{
            const replies=await commentmodel.findById(commentid).select('replies');
            console.log('replies',replies.replies);
            if(replies && replies.replies.length>0){
                replies.replies.forEach(async(reply)=>{
                    await replymodel.findByIdAndDelete(reply);

                })
                }
            
            const comment=await commentmodel.findByIdAndDelete(commentid);
            if(!comment){
                return null;
            }
            return comment;
        }catch(err){
            console.error('error on deleteComment',err);
            const error=new Error('Failed to delete comment');
            error.status=500;
            error.message='Failed to delete comment';
            error.name='CommentServiceError';
            throw error;
        }
    },
    createReply:async(replydata,commentid)=>{
        try{
            console.log('replydata',replydata);
            console.log('commentid',commentid);
            let defaultreply=1;
            if(replydata.parentReplyId){
                const comment =await commentmodel.findOne(
                    {_id:commentid,"replies._id":replydata.parentReplyId},
                    {"replies.$":1}
                )
                if(comment && comment.replies.length>0){
                    defaultreply=comment.replies[0].replyLevel+1;
                }
            };
            const reply= await replymodel.create({
                content:replydata.content,
                user:new mongoose.Types.ObjectId(replydata.user._id),
                replyLevel:defaultreply,
                parentReplyId:replydata.parentReplyId,
            });
            if(!reply){
                return null;
            }
            const updatedComment=await commentmodel.findByIdAndUpdate(
                commentid,
                {$push:{replies:reply._id}},
                {new:true}
            );
            if(!updatedComment){
                return null;
            }
            
            // Properly populate the reply with its nested fields
            const populatedReply=await replymodel.findById(reply._id)
            .populate('user')
            .populate({
                path: 'parentReplyId',
                populate: { path: 'user' }
            });
            
            if(!populatedReply){
                return null;
            }
            return populatedReply;

        }catch(err){
            console.error('error on createReply',err);
            const error=new Error('Failed to create reply');
            error.status=500;
            error.message='Failed to create reply';
            error.name='CommentServiceError';
            throw error;
        }
    },
    updateReply:async(replyid,replydata)=>{
        try{
            const reply=await replymodel.findByIdAndUpdate(
                {_id:replyid},
                {$set:replydata},
                {new:true}
            )
            .populate('user')
            .populate({
                path:'parentReplyId',
                populate:{ path: 'user' }
            });
            if(!reply){
                return null;
            }
            return reply;
        }catch(err){
            console.error('error on updateReply',err);
            const error=new Error('Failed to update reply');
            error.status=500;
            error.message='Failed to update reply';
            error.name='CommentServiceError';
            throw error;
        }
    },
    deleteReply:async(replyId,commentId)=>{
        try{
            console.log('replyid',replyId);
            console.log('commentid',commentId);
            const reply=await replymodel.findByIdAndDelete(replyId);
            if(!reply){
                console.log('reply not found on deleteReply');
                return null;
            }
            
            // Modified query to properly find and update the comment
            const comment=await commentmodel.findByIdAndUpdate(
                commentId,
                {$pull:{replies:replyId}},
                {new:true}
            );
            
            if(!comment){
                console.log('comment not found on deleteReply');
                return null;
            }
            
            const populatedComment=await commentmodel.findById(commentId)
            .populate({
                path:'replies',
                populate:[
                    {path:'user'},
                    {path:'parentReplyId',populate:{path:'user'}}
                ]
            });
            return populatedComment;
        }catch(err){
            console.error('error on deleteReply',err);
            const error=new Error('Failed to delete reply');
            error.status=500;
            error.message='Failed to delete reply';
            error.name='CommentServiceError';
            throw error;
        }
    }
}
module.exports=CommentService;