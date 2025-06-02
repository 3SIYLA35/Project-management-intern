import { apiClient, extractErrorDetails } from './apiClient';

export interface Participant{
  id: string;
  user:{
    _id:string;
    name?:string;
    email?:string;
    profilePicture?:string;
  };
  isOnline: boolean;
}

export interface Conversation{
  _id: string;
  participants:Participant[];
  createdAt:string;
  updatedAt:string;
}

export interface ConversationResponse{
  success:boolean;
  conversation:Conversation;
  message?:string;
}

export interface ConversationsResponse {
  success: boolean;
  conversations: Conversation[];
}
const conversationApi={
  createConversation: async(participants:string[])=>{
    try{
      return await apiClient.post<ConversationResponse>('/conversations/create-converstation',{participants});
    }catch(error){
      console.error('error creating conversation:', extractErrorDetails(error));
      throw error;
    }
  },

  getUserConversations:async(userId:string)=>{
    try{
      return await apiClient.get<ConversationsResponse>(`/conversations/get-user-converstation/${userId}`);
    } catch (error){
      console.error('error fetching conversations:', extractErrorDetails(error));
      throw error;
    }
  },

  getConversation:async(conversationId:string)=>{
    try{
      return await apiClient.get<ConversationResponse>(`/conversations/get-converstation/${conversationId}`);
    }catch(error){
      console.error('Error fetching conversation:', extractErrorDetails(error));
      throw error;
    }
  },


  deleteConversation:async(conversationId: string): Promise<{ success: boolean; message: string }> => {
    try {
      return await apiClient.delete<{ success:boolean;message:string }>(`/conversations/delete-converstation/${conversationId}`);
    } catch (error) {
      console.error('Error deleting conversation:',extractErrorDetails(error));
      throw error;
    }
  }
};

export default conversationApi; 