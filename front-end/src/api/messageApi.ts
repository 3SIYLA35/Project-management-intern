import { apiClient, extractErrorDetails } from './apiClient';

export interface Message{
  _id: string;
  conversationId:string;
  sender:{
    _id:string;
    name?:string;
    email?:string;
    profilePicture?:string;
  };
  content:string;
  read:boolean;
  createdAt:string;
  updatedAt:string;
}

export interface MessageResponse{
  success:boolean;
  data?:Message;
  message?:string;
}

export interface MessagesResponse{
  success:boolean;
  messages:Message[];
  totalMessages:number;
  totalPages:number;
  currentPage:number;
}

export interface UnreadCountResponse{
  success: boolean;
  unreadCount: number;
}

const messageApi={
  sendMessage:async(conversationId:string,sender:string,content:string)=>{
    try{
      return await apiClient.post<MessageResponse>('/messages/send-message',{
        conversationId,
        sender,
        content
      });
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
      return await apiClient.get<MessagesResponse>(
        `/conversations/get-conversation-messages/${conversationId}?page=${page}&limit=${limit}`
      );
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

  getUnreadMessageCount: async(userId:string)=>{
    try{
      return await apiClient.get<UnreadCountResponse>(`/messages/get-unread-message/${userId}`);
    } catch (error) {
      console.error('error getting unread count:', extractErrorDetails(error));
      throw error;
    }
  }
};

export default messageApi; 