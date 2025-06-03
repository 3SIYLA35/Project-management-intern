const messageService=require('../Services/messageService');
const conversationService=require('../Services/conversationService');
const mongoose=require('mongoose');


exports.sendMessage=async(req, res,next)=>{
    try {
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({error:"unauthorized"});
        }
      const {conversationId,sender,content}=req.body;
      if (!conversationId || !sender || !content) {
        return res.status(400).json({
          success: false,
          message: 'conversation ID, sender, and content are required'
        });
      }
      if(!mongoose.Types.ObjectId.isValid(conversationId) || 
          !mongoose.Types.ObjectId.isValid(sender)) {
        return res.status(400).json({
          success: false,
          message: 'invalid conversation ID or sender ID'
        });
      }      
      const conversation=await conversationService.getConversationById(conversationId);
      if(!conversation){
        return res.status(404).json({
          success: false,
          message: 'conversation not found'
        });
      }
      const isParticipant=conversation.participants.some(p => 
        p.id.toString()===sender.toString()
      );
      if (!isParticipant) {
        return res.status(403).json({
          success: false,
          message: 'Sender is not a participant in this conversation'
        });
      } 
      const message=await messageService.createMessage({
        conversationId,
        sender,
        content
      });
      res.status(201).json({
        success: true,
        message: 'message sent successfully',
        message
      });
    }catch(error){
      next(error)
    }
  }
  
exports.getConversationMessages=async(req,res,next)=>{
    try {
      const userId=req.user.id;
      if(!userId){
        return res.status(401).json({error:"unauthorized"});
      }
      const {conversationId}=req.params;
      const page=parseInt(req.query.page)||1;
      const limit=parseInt(req.query.limit)||20;
      if(!mongoose.Types.ObjectId.isValid(conversationId)){
        return res.status(400).json({
          success: false,
          message: 'invalid conversation ID'
        });
      }
      const conversation=await conversationService.getConversationById(conversationId);
      if(!conversation){
        return res.status(404).json({
          success:false,
          message:'conversation not found'
        });
      }      
      const messages=await messageService.getConversationMessages(conversationId,page,limit);
      res.status(200).json({
        success: true,
        ...messages
      });
    }catch(error){
      next(error)
    }
  }
  
exports.markMessagesAsRead=async(req,res,next)=>{
    try {
      const {conversationId}=req.params;
      const userId=req.user.id;
      if(!userId){
        return res.status(401).json({error:"unauthorized"});
      }
      const updatedCount=await messageService.markMessagesAsRead(conversationId, userId);
      res.status(200).json({
        success: true,
        message: `${updatedCount} messages marked as read`,
        updatedCount
      });
    }catch(error){
      next(error)
    }
  }
  
exports.deleteMessage=async(req,res,next)=>{
    try {
        const userid=req.user.id;
        if(!userid){
            return res.status(401).json({error:"unauthorized"});
        }
      const {messageId}=req.params;
      if (!messageId){
        return res.status(400).json({
          success:false,
          message:'invalid message ID'
        });
      }
      const result=await messageService.deleteMessage(messageId);
      if(!result){
        return res.status(404).json({
          success: false,
          message: 'message not found'
        });
      }
      res.status(200).json({
        success: true,
        message: 'message deleted successfully'
      });
    }catch(error){
      next(error)
    }
  }
  
exports.getUnreadMessageCount=async(req,res,next)=>{
    try {
      const userId=req.user.id;
      if (!userId){
        return res.status(400).json({
          success:false,
          message:'unauthorized'
        });
      }
      const unreadCount=await messageService.getUnreadMessageCount(userId);
      if(!unreadCount){
        return res.status(200).json({
          success:true,
          message:'no unread messages',
          unreadCount:0
        });
      }
      res.status(200).json({
        success: true,
        unreadCount
      });
    }catch(error){
      next(error)
    }
  }

