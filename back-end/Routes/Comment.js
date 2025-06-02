const express=require('express');
const commentController=require('../Controllers/CommentController');
const {authenticateUser}=require('../Middleware/Auth');
const Router=express.Router();

// Task comments routes
Router.get('/task/:taskId/get-comments',authenticateUser,commentController.getComments);
Router.post('/task/create-comment',authenticateUser,commentController.createComment);
Router.put('/task/update-comment',authenticateUser,commentController.updateComment);
Router.delete('/task/delete-comment/:commentId',authenticateUser,commentController.deleteComment);
Router.post('/task/comment/:commentId/reply/create-reply',authenticateUser,commentController.createReply);
Router.put('/task/comment/reply/update-reply',authenticateUser,commentController.updateReply);
Router.delete('/task/comment/:commentId/reply/delete-reply/:replyId',authenticateUser,commentController.deleteReply);

// Project comments routes
Router.get('/project/:projectId/get-comments',authenticateUser,commentController.getProjectComments);
Router.post('/project/create-comment',authenticateUser,commentController.createProjectComment);
Router.put('/project/update-comment',authenticateUser,commentController.updateComment);
Router.delete('/project/delete-comment/:commentId',authenticateUser,commentController.deleteComment);
Router.post('/project/comment/:commentId/reply/create-reply',authenticateUser,commentController.createReply);
Router.put('/project/comment/reply/update-reply',authenticateUser,commentController.updateReply);
Router.delete('/project/comment/:commentId/reply/delete-reply/:replyId',authenticateUser,commentController.deleteReply);

module.exports=Router;