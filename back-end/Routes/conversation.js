const express=require('express');
const router=express.Router();
const conversationController=require('../Controllers/conversationController');
const messageController=require('../Controllers/messageController');
const {authenticateUser}=require('../Middleware/Auth');

router.post('/create-converstation',authenticateUser, conversationController.createConversation);
router.get('/get-user-converstation',authenticateUser, conversationController.getUserConversations);
router.get('/get-converstation/:conversationId',authenticateUser, conversationController.getConversation);
router.delete('/delete-converstation/:conversationId',authenticateUser, conversationController.deleteConversation);

//messages
router.get('/get-conversation-messages/:conversationId',authenticateUser,messageController.getConversationMessages);
router.post('/mark-read/:conversationId',authenticateUser,messageController.markMessagesAsRead);

module.exports = router;;