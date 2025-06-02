import { useState, useEffect, useCallback } from 'react';
import { Message } from '../api/messageApi';
import { Conversation } from '../api/conversationApi';
import conversationApi from '../api/conversationApi';
import messageApi from '../api/messageApi';
import socketService from '../api/socketService';
import { useAuth } from './useAuth';

export const useChat=()=>{
  const {user}=useAuth();
  const [conversations,setConversations]=useState<Conversation[]>([]);
  const [activeConversation,setActiveConversation]=useState<Conversation|null>(null);
  const [messages,setMessages]=useState<Message[]>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const [error,setError]=useState<string|null>(null);
  const [unreadCount,setUnreadCount]=useState<number>(0);
  const [typingUsers,setTypingUsers]=useState<Record<string, boolean>>({});
  const [currentPage,setCurrentPage]=useState<number>(1);
  const [totalPages, setTotalPages]=useState<number>(1);


  const loadConversations=async()=>{
    if (!user?._id) return;
    try {
      setLoading(true);
      const response=await conversationApi.getUserConversations(user._id);
      setConversations(response.conversations);
      const unreadResponse=await messageApi.getUnreadMessageCount(user._id);
      setUnreadCount(unreadResponse.unreadCount);
    }catch(err:any){
      setError(err.message || 'Error loading conversations');
    }finally{
      setLoading(false);
    }
  };

  const loadMessages=async(conversationId:string,page:number=1)=>{
    if (!conversationId) return;
    try{
      setLoading(true);
      const response=await messageApi.getConversationMessages(conversationId, page);
      if(page===1){
        setMessages(response.messages);
      }else{
        setMessages(prevMessages =>[...response.messages,...prevMessages]);
      }
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch(err:any){
      setError(err.message || 'Error loading messages');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMessages=async()=>{
    if (!activeConversation || currentPage >=totalPages)return;
    await loadMessages(activeConversation._id,currentPage+1);
  };

  const handleSetActiveConversation=(conversation:Conversation|null)=>{
    if (activeConversation){
      socketService.leaveConversation(activeConversation._id);
    }
    setActiveConversation(conversation);
    setMessages([]);
    setCurrentPage(1);
    if(conversation){
      loadMessages(conversation._id);
      socketService.joinConversation(conversation._id);
      if(user?._id){
        markMessagesAsRead();
      }
    }
  };

  const sendMessage=async(content:string)=>{
    if(!activeConversation||!user?._id ||!content.trim())return;
    
    try {
      socketService.sendMessage({
        conversationId: activeConversation._id,
        sender:user._id,
        content:content.trim()
      });
    } catch (err: any) {
      setError(err.message || 'Error sending message');
    }
  };

  const markMessagesAsRead=async()=>{
    if (!activeConversation || !user?._id) return;
    
    try{
      socketService.markMessagesAsRead({
        conversationId:activeConversation._id,
        userId:user._id
      });
    }catch(err:any){
      console.error('Error marking messages as read:', err);
    }
  };

  const createConversation=async(participants: string[])=>{
    try{
      if(user?._id && !participants.includes(user._id)){
        participants.push(user._id);
      }
      const response=await conversationApi.createConversation(participants);

      await loadConversations();
      
      return response.conversation;
    } catch (err: any) {
      setError(err.message || 'Error creating conversation');
      return null;
    }
  };
  const deleteConversation=async (conversationId: string)=> {
    try {
      await conversationApi.deleteConversation(conversationId);
      if (activeConversation?._id===conversationId) {
        setActiveConversation(null);
        setMessages([]);
      }
      await loadConversations();
      return true;
    } catch(err:any){
      setError(err.message || 'Error deleting conversation');
      return false;
    }
  };

  const setTypingStatus=(isTyping:boolean)=>{
    if (!activeConversation || !user?._id) return;
    socketService.sendTypingStatus({
      conversationId: activeConversation._id,
      userId: user._id,
      isTyping
    });
  };

  useEffect(()=>{
    if (!user?._id) return;
    const socket=socketService.connect(user._id);
    socketService.subscribe({
      receiveMessage:(newMessage: Message)=>{
        if (activeConversation?._id===newMessage.conversationId){
          setMessages(prevMessages => [...prevMessages, newMessage]);
          if (user._id!==newMessage.sender._id){
            markMessagesAsRead();
          }
        }
        if(user._id !== newMessage.sender._id){
          setUnreadCount(prev=>prev+1);
        }
      },
        
      messagesRead:({conversationId,userId})=>{
        if (activeConversation?._id===conversationId && userId!==user._id) {
          setMessages(prevMessages=> 
            prevMessages.map(msg=> 
              msg.sender._id===user._id ? { ...msg,read:true}:msg
            )
          );
        }
      },
      
      userStatusChange:({userId,isOnline})=>{
        setConversations(prevConversations=> 
          prevConversations.map(conv=>({
            ...conv,
            participants:conv.participants.map(p=> 
              p.id===userId?{...p, isOnline }:p
            )
          }))
        );
      },
      
      userTyping:({conversationId,userId,isTyping})=>{
        if (activeConversation?._id === conversationId && userId !== user._id) {
          setTypingUsers(prev => ({ ...prev, [userId]: isTyping }));
        }
      }
    });
    
      loadConversations();
    
    return () => {
      socketService.disconnect();
    };
  }, [user, activeConversation, loadConversations]);

  return {
    conversations,
    activeConversation,
    messages,
    loading,
    error,
    unreadCount,
    typingUsers,
    setActiveConversation: handleSetActiveConversation,
    sendMessage,
    loadMoreMessages,
    markMessagesAsRead,
    createConversation,
    deleteConversation,
    setTypingStatus
  };
};

export default useChat; 