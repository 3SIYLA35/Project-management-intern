const CommentService=require('../Services/CommentService.js');

// Task comments
exports.getComments=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const taskId=req.params.taskId;
        if(!taskId){
            return res.status(400).json({message:'Task ID is required'});
        }
        const comments=await CommentService.getComments(taskId);
        if(!comments){
            return res.status(404).json({message:'No comments found'});
        }
        res.status(200).json(comments);
    }catch(err){
        console.error('error on getComments',err);
        next(err);
    }
}

exports.createComment=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const {taskId}=req.body;
        if(!taskId){
            return res.status(400).json({message:'Task ID and content are required'});
        }
        const comment=await CommentService.createComment(req.body);
        if(!comment){
            return res.status(400).json({message:'Failed to create comment'});
        }
        res.status(201).json(comment);
    }catch(err){
        console.error('error on createComment',err);
        next(err);
    }
}

// Project comments
exports.getProjectComments=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const projectId=req.params.projectId;
        if(!projectId){
            return res.status(400).json({message:'Project ID is required'});
        }
        const comments=await CommentService.getProjectComments(projectId);
        if(!comments){
            return res.status(404).json({message:'No comments found'});
        }
        res.status(200).json(comments);
    }catch(err){
        console.error('error on getProjectComments',err);
        next(err);
    }
}

exports.createProjectComment=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const {projectId}=req.body;
        if(!projectId){
            return res.status(400).json({message:'Project ID and content are required'});
        }
        const comment=await CommentService.createProjectComment(req.body);
        if(!comment){
            return res.status(400).json({message:'Failed to create project comment'});
        }
        res.status(201).json(comment);
    }catch(err){
        console.error('error on createProjectComment',err);
        next(err);
    }
}

// Common methods for both task and project comments
exports.updateComment=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const commentId=req.body._id;
        if(!commentId){
            return res.status(400).json({message:'Comment ID is required'});
        }
        const comment=await CommentService.updateComment(commentId,req.body);
        if(!comment){
            return res.status(404).json({message:'Comment not found'});
        }
        res.status(200).json(comment);
    }catch(err){
        console.error('error on updateComment',err);
        next(err);
    }
}

exports.deleteComment=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const commentId=req.params.commentId;
        if(!commentId){
            return res.status(400).json({message:'Comment ID is required'});
        }
        const comment=await CommentService.deleteComment(commentId);
        if(!comment){
            return res.status(404).json({message:'Comment not found'});
        }
        res.status(200).json({message:'Comment deleted successfully'});
    }catch(err){
        console.error('error on deleteComment',err);
        next(err);
    }
}

exports.createReply=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const commentId=req.params.commentId;
        if(!commentId){
            return res.status(400).json({message:'Comment ID is required'});
        }
        const reply=await CommentService.createReply(req.body,commentId);;
        if(!reply){
            return res.status(400).json({message:'Failed to create reply'});
        }
        res.status(201).json(reply);
    }catch(err){
        console.error('error on createReply',err);
        next(err);
    }
}

exports.updateReply=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const replyId=req.body._id;
        if(!replyId){
            return res.status(400).json({message:'Reply ID is required'});
        }
        const reply=await CommentService.updateReply(replyId,req.body);
        if(!reply){
            return res.status(404).json({message:'Reply not found'});
        }
        res.status(200).json(reply);
    }catch(err){
        console.error('error on updateReply',err);
        next(err);
    }
}

exports.deleteReply=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const replyId=req.params.replyId;
        const commentId=req.params.commentId;
        if(!replyId || !commentId){
            return res.status(400).json({message:'Reply ID and Comment ID are required'});
        }
        const reply=await CommentService.deleteReply(replyId,commentId);
        if(!reply){
            return res.status(404).json({message:'Reply not found'});
        }
        res.status(200).json(reply);
    }catch(err){
        console.error('error on deleteReply',err);
        next(err);
    }
}