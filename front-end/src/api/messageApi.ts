import { apiClient, extractErrorDetails } from './apiClient';
import {adaptmessage, adaptmessageforapi, messageApi as messageapi,messagesApi} from '../adapters/messagesAdapter';
import { Message } from '@/components/Profile/types';


const messageApi={
  sendMessage:async(payload:Partial<Message>)=>{
    try{
      const formattedpayload=adaptmessageforapi(payload);
      const response=await apiClient.post<messagesApi>('/messages/send-message',formattedpayload);
      return adaptmessage(response);
    }catch(error){
      console.error('Error sending message:', extractErrorDetails(error));
      throw error;
    }
  },

  getConversationMessages:async(
    conversationId:string,
    page:number=1,
    limit:number=20
  )=>{
    try{
      const response=await apiClient.get<messageapi>(
        `/conversations/get-conversation-messages/${conversationId}?page=${page}&limit=${limit}`
      );
      return{
        messages:response.messages.map(adaptmessage),
        totalMessages:response.totalMessages,
        totalPages:response.totalPages,
        currentPage:response.currentPage,
      }
    }catch(error){
      console.error('Error fetching messages:', extractErrorDetails(error));
      throw error;
    }
  },

  markMessagesAsRead:async(conversationId:string,userId:string)=>{
    try{
      return await apiClient.post<{ success:boolean;message:string;updatedCount:number }>(
        `/conversations/mark-read/${conversationId}`,
        { userId }
      );
    }catch(error){
      console.error('Error marking messages as read:', extractErrorDetails(error));
      throw error;
    }
  },

  deleteMessage: async(messageId:string)=>{
    try{
      return await apiClient.delete<{ success:boolean;message:string }>(`/messages/delete-message/${messageId}`);
    } catch (error) {
      console.error('Error deleting message:', extractErrorDetails(error));
      throw error;
    }
  },

  getUnreadMessageCount: async()=>{
    try{
      const response=await apiClient.get<{success:boolean;unreadCount:number}>(`/messages/get-unread-message`);
      return response.unreadCount;
    }catch(error){
      console.error('error getting unread count:', extractErrorDetails(error));
      throw error;
    }
  }
};

export default messageApi; 