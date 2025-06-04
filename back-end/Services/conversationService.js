const Conversation = require('../Models/conversation');
const User = require('../Models/USERS');;

const  ConversationService={
   createConversation:async(participants)=>{
    try{
      console.log(participants);
      const formatparticapants=participants.map(id=>({
        id,
        isOnline: false
      }));
      const newConversation=new Conversation({
        participants:formatparticapants
      });
      return await newConversation.save();
    } catch(err){
      const error=new Error('Failed to create conversation');
      error.status=500;
      error.message='Failed to create conversation';
      error.name='ConversationServiceError'; 
      throw error;
    }
  },
   getUserConversations:async(userId)=>{
    try{
      const conversations=await Conversation.find({
        'participants.id':userId
      }).sort({updatedAt:-1}).populate('participants.id');
      if(!conversations){
        return [];
      }
      return conversations;
    }catch(err){
      const error=new Error('Failed to get user conversations');
      error.status=500;
      error.message='Failed to get user conversations';
      error.name='ConversationServiceError';
      throw error;
    }
  },
   getConversationById:async(conversationId)=>{
    try{
      const conversation=await Conversation.findById(conversationId);
      if(!conversation){
        return null;
      }
      return conversation;
    }catch(err){
      const error=new Error('Failed to get conversation by id');
      error.status=500;
      error.message='Failed to get conversation by id';
      error.name='ConversationServiceError';
      throw error;
    }
  },
   getConversationByParticipants:async(userIds)=>{
    try{
      const conversation=await Conversation.findOne({
        'participants.id':{$all:userIds },
        'participants':{$size:userIds.length }
      });
      if(!conversation){
        return null;
      }
      return conversation;
    } catch (err){
      const error=new Error('Failed to get conversation by participants');
      error.status=500;
      error.message='Failed to get conversation by participants';
      error.name='ConversationServiceError';
      throw error;
    }
  },
   updateUserOnlineStatus:async(userId,isOnline)=>{
    try{
        // console.log(userId,isOnline);
      await Conversation.updateMany(
        {'participants.id': userId },
        {$set:{'participants.$.isOnline': isOnline } }
      );
      // if(isOnline){
      //   await Conversation.updateMany(
      //     {'participants.id':{$ne:userId}},
      //     {$set:{'participants.$.isOnline':false}}
      //   );
      // }
      return true;
    } catch (err){
      const error=new Error('Failed to update user online status');
      error.status=500;
      error.message='Failed to update user online status';
      error.name='ConversationServiceError';
      throw error;
    }
  },
   deleteConversation:async(conversationId)=>{
    try{
      const conversation=await Conversation.findByIdAndDelete(conversationId);
      if(!conversation){
        return null;
      }
      return conversation;
    } catch (err){
      const error=new Error('Failed to delete conversation');
      error.status=500;
      error.message='Failed to delete conversation';
      error.name='ConversationServiceError';
      throw error;
    }
  }
}

module.exports=ConversationService; 