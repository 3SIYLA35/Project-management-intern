const conversationService=require('../Services/conversationService');
const messageService=require('../Services/messageService');
const mongoose=require('mongoose');


exports.createConversation=async(req,res,next)=>{
    try {
        const userid=req.user.id;
        if(!userid){
            return res.status(401).json({error:"unauthorized"});
        }
      const {participants}=req.body;
      if (!participants || !Array.isArray(participants) || participants.length < 2) {
        return res.status(400).json({ 
          success: false, 
          message: 'at least two valid participants are required' 
        });
      }
      const validpraticapants=participants.filter(id=>mongoose.Types.ObjectId.isValid(id));
      if(validpraticapants.length<2){
        return res.status(400).json({ 
          success:false, 
          message:'at least two valid participant IDs are required' 
        });
      }
      const existingConversation=await conversationService.getConversationByParticipants(validpraticapants);
      if(existingConversation){
        return res.status(200).json({
          success:true,
          message:'conversation already exists',
          conversation: existingConversation
        });
      }
      const newConversation=await conversationService.createConversation(validpraticapants);
      res.status(201).json({
        success:true,
        message:'conversation created successfully',
        conversation: newConversation
      });
    }catch(error){
      next(error)
    }
  }
  
 
exports.getUserConversations=async(req, res, next)=>{
    try {
      const userId=req.user.id;
      if(!userId){
        return res.status(401).json({error:"unauthorized"});
      }
      if (!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({
          success:false,
          message:'invalid user ID'
        });
      }
      const conversations=await conversationService.getUserConversations(userId);
      if(!conversations || conversations.length===0){
        return res.status(200).json({
          success:true,
          message:'no conversations found',
          conversations:[]
        });
      }
      res.status(200).json({
        success:true,
        conversations
      });
    }catch(error){
      next(error)
    }
  }
  
exports.getConversation=async(req, res, next)=>{
    try {
      const {conversationId}=req.params;
      if (!mongoose.Types.ObjectId.isValid(conversationId)){
        return res.status(400).json({
          success:false,
          message:'invalid conversation ID'
        });
      }
      const conversation=await conversationService.getConversationById(conversationId);
      if(!conversation){
        return res.status(404).json({
          success:false,
          message:'Conversation not found'
        });;
      }
      res.status(200).json({
        success: true,
        conversation
      });
    }catch(error){
      next(error)
    }
  };;
exports.deleteConversation=async(req,res,next)=>{
    try {
      const {conversationId}=req.params;
      if(!mongoose.Types.ObjectId.isValid(conversationId)){
        return res.status(400).json({
          success:false,
          message:'invalid conversation ID'
        });
      }
      const result=await conversationService.deleteConversation(conversationId);
      if(!result){
        return res.status(404).json({
          success:false,
          message:'Conversation not found'
        });
      }
      res.status(200).json({
        success:true,
        message:'Conversation deleted successfully'
      });
    }catch(error){
      next(error);
    }
  }


