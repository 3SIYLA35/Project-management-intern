const Message = require('../Models/messages');
const Conversation = require('../Models/conversation');

const MessageService={
   createMessage:async(messageData)=>{
    try{
      const { conversationId,sender,content}=messageData;
      const conversationExists=await Conversation.findById(conversationId);
      if (!conversationExists){
        throw new Error('Conversation not found');
      }
      const newMessage=new Message({
        conversationId,
        sender,
        content,
        read: false
      });
      const savedMessage=await newMessage.save();
      await Conversation.findByIdAndUpdate(
        conversationId,
        { $set:{updatedAt:new Date()}}
      );
      return savedMessage;
    }catch(err){
      const error=new Error('Failed to create message');
      error.status=500;
      error.message='Failed to create message';
      error.name='MessageServiceError';
      throw error;
    }
  },
  
   getConversationMessages:async(conversationId,page=1,limit=20)=>{
    try{
      const skip=(page-1)*limit;
      const messages=await Message.find({conversationId})
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
        .populate('sender','name email avatarUrl')
        .lean();
      if(!messages){
        return [];
      }
      const totalMessages=await Message.countDocuments({conversationId});
      return {
        messages:messages.reverse(),
        totalMessages,
        totalPages:Math.ceil(totalMessages/limit),
        currentPage:page
      };
    }catch(err){
      const error=new Error('Failed to get conversation messages');
      error.status=500;
      error.message='Failed to get conversation messages';
      error.name='MessageServiceError';
      throw error;
    }
  },
  

   markMessagesAsRead:async(conversationId,userId)=>{
    try {
      const result=await Message.updateMany(
        { 
          conversationId, 
          sender:{$ne:userId}, 
          read:false 
        },
        {$set:{read:true}}
      );;
      
      return result.modifiedCount;
    }catch(err){  
        const error=new Error('Failed to mark messages as read');
        error.status=500;
        error.message='Failed to mark messages as read';
        error.name='MessageServiceError';
        throw error;
    }
  },
  

   deleteMessage:async(messageId)=>{
    try{
      const message=await Message.findByIdAndDelete(messageId);
      if(!message){
        return null;
      }
      return message;
    } catch (err){
      const error=new Error('Failed to delete message');
      error.status=500;
      error.message='Failed to delete message';
      error.name='MessageServiceError';
      throw error;
    }
  },
  
   getUnreadMessageCount:async(userId)=>{
    try{
      const conversations=await Conversation.find({
        'participants.id': userId
      }).select('_id');
      if(!conversations){
        return 0;
      }
      const conversationIds=conversations.map(conv=>conv._id);
      const unreadCount=await Message.countDocuments({
        conversationId:{$in:conversationIds },
        sender:{$ne:userId},
        read:false
      });
      return unreadCount;
    }catch(err){
        
        const error=new Error('');
         
      throw new Error(`Error getting unread message count: ${error.message}`);
    }
  },
   getmessagebyID:async(messageid)=>{
    try{
      const message=await Message.findById(messageid)
      .populate('sender')
      .lean();
      if(!message){
        return null;
      }
      return message;
    }catch(err){
      const error=new Error('Failed to get message by ID');
      error.status=500;
      error.message='Failed to get message by ID';
      error.name='MessageServiceError';
      throw error;
    }
  }
}

module.exports=MessageService; 