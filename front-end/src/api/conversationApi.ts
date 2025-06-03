import { apiClient, extractErrorDetails } from './apiClient';
import { adaptConverstation, conversationApi as converstationapi, safeadaptconverstation} from '../adapters/converasationAdapter';
import { converstation } from '@/components/Profile/types';
const conversationApi={
  createConversation: async(participants:string[])=>{
    try{
      return await apiClient.post<converstationapi>('/conversations/create-converstation',{participants});
    }catch(error){
      console.error('error creating conversation:', extractErrorDetails(error));
      throw error;
    }
  },

  getUserConversations:async():Promise<converstation[]>=>{
    try{
      // console.log('userId',userId);
      const response= await apiClient.get<converstationapi>(`/conversations/get-user-converstation`);
      if(!response?.success){
        throw new Error(response?.message);
      }
      return safeadaptconverstation(response) as converstation[];
    } catch (error){
      console.error('error fetching conversations:', extractErrorDetails(error));
      throw error;
    }
  },

  getConversation:async(conversationId:string)=>{
    try{
      const response= await apiClient.get<converstationapi>(`/conversations/get-converstation/${conversationId}`);
      if(!response?.success){
        throw new Error(response?.message);
      }
      return safeadaptconverstation(response) as converstation;
    }catch(error){
      console.error('Error fetching conversation:', extractErrorDetails(error));
      throw error;
    }
  },


  deleteConversation:async(conversationId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response= await apiClient.delete<{ success:boolean;message:string }>(`/conversations/delete-converstation/${conversationId}`);
      if(!response?.success){
        throw new Error(response?.message);
      }
      return response;
    } catch (error) {
      console.error('Error deleting conversation:',extractErrorDetails(error));
      throw error;
    }
  }
};

export default conversationApi; 