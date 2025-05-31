const commentmodel=require('../Models/Comments.js');
const replymodel=require('../Models/reply.js');


const CommentService={
    getComments:async(taskId)=>{
        try{
            const comments=await commentmodel.find({taskId})
            .populate('replies')
            .populate('user');
            if(!comments){
                return null;
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
            return comment;
        }catch(err){
            console.error('error on createComment',err);
            const error=new Error('Failed to create comment');
            error.status=500;
            error.message='Failed to create comment';
            error.name='CommentServiceError';
            throw error;
        }
    },
    updateComment:async(commentid,commentdata)=>{
        try{
            const comment=await commentmodel.findByIdAndUpdate(
                commentid,
                {$set:commentdata}
            );
            if(!comment){
                return null;
            }
            return comment;

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
            const reply={
                content:replydata.content,
                user:replydata.userId,
                replyLevel:defaultreply,
                parentReplyId:replydata.parentReplyId,
            };
            const updatedComment=await commentmodel.findByIdAndUpdate(
                commentid,
                {$push:{replies:reply}},
                {new:true}
            );
            if(!updatedComment){
                return null;
            }
            return updatedComment;

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
    deleteReply:async(replyid,commentid)=>{
        try{
            const comment=await commentmodel.findOneAndUpdate(
                {_id:commentid,"replies._id":replyid},
                {$pull:{replies:{_id:replyid}}},
                {new:true}
            );
            if(!comment){
                return null;
            }
            return comment;

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