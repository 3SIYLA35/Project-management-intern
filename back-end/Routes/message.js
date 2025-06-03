const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/messageController');
const {authenticateUser}=require('../Middleware/Auth');


router.post('/send-message',authenticateUser, messageController.sendMessage);
router.delete('/delete-message/:messageId',authenticateUser, messageController.deleteMessage);
router.get('/get-unread-message',authenticateUser, messageController.getUnreadMessageCount);

module.exports=router;;