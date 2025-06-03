import { useState, useEffect, useCallback } from 'react';
import { Message } from '../api/messageApi';
import { converstation } from '../components/Profile/types';
import conversationApi from '../api/conversationApi';
import messageApi from '../api/messageApi';
import socketService from '../api/socketService';
import { useProfile } from './useProfile';
import { useProfileContext } from '../Contexts/ProfileContext';

export const useChat=()=>{
  const {profile,fetchProfile}=useProfileContext();
  
  const user=profile;
  const [conversations,setConversations]=useState<converstation[]>([]);
  const [activeConversation,setActiveConversation]=useState<converstation|null>(null);
  const [messages,setMessages]=useState<Message[]>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const [error,setError]=useState<string|null>(null);
  const [unreadCount,setUnreadCount]=useState<number>(0);
  const [typingUsers,setTypingUsers]=useState<Record<string, boolean>>({});
  const [currentPage,setCurrentPage]=useState<number>(1);
  const [totalPages, setTotalPages]=useState<number>(1);


  const loadConversations=async()=>{
    console.log('loadConversations');
        try {
      setLoading(true);
      const response=await conversationApi.getUserConversations();
      console.log('response from loadConversations',response);
      setConversations(response as converstation[]);
      console.log('conversations',conversations);
      const unreadResponse=await messageApi.getUnreadMessageCount();
      setUnreadCount(unreadResponse.unreadCount);
    }catch(err:any){
      setError(err.message || 'error loading conversations');
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
        setMessages(prevMessages=>[...response.messages,...prevMessages]);
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
    await loadMessages(activeConversation.id,currentPage+1);
  };

  const handleSetActiveConversation=(conversation:converstation|null)=>{
    // console.log('activeConversation from handleSetActiveConversation',activeConversation);
    if(activeConversation){
      socketService.leaveConversation(activeConversation.id);
    }
    setActiveConversation(conversation);
    setMessages([]);
    setCurrentPage(1);
    if(conversation){
      loadMessages(conversation.id);
      socketService.joinConversation(conversation.id);
      if(user?.id){
        markMessagesAsRead();
      }
    }
  };

  const sendMessage=async(content:string)=>{
    if(!activeConversation||!user?.id ||!content.trim())return;
    try {
      const optimisticmessage:Message={
        _id:'temp-'+Date.now(),
        conversationId:activeConversation.id,
        sender:{
          _id:user.id,
          name:user.name,
          email:user.email,
          profilePicture:user.avatar
        },
        content:content.trim(),
        read:false,
        createdAt:new Date().toISOString(),
        updatedAt:new Date().toISOString()
      }
      setMessages(prevMessages=>[...prevMessages,optimisticmessage]);
      socketService.sendMessage({
        conversationId:activeConversation.id,
        sender:user.id,
        content:content.trim()
      });
    }catch(err:any){
      setError(err.message||'Error sending message');
      setMessages(prevMessages=>prevMessages.filter(msg=>msg._id!=='temp-'+Date.now()));
    }
  };

  const markMessagesAsRead=async()=>{
    if (!activeConversation || !user?.id) return;
    
    try{
      socketService.markMessagesAsRead({
        conversationId:activeConversation.id,
        userId:user.id
      });
    }catch(err:any){
      console.error('Error marking messages as read:', err);
    }
  };

  const createConversation=async(participants: string[])=>{
    try{
      if(user?.id && !participants.includes(user.id)){
        participants.push(user.id);
      }
      const response=await conversationApi.createConversation(participants);

      await loadConversations();
      
        return ;
    } catch (err: any) {
      setError(err.message || 'Error creating conversation');
      return null;
    }
  };
  const deleteConversation=async (conversationId: string)=> {
    try {
      await conversationApi.deleteConversation(conversationId);
      if (activeConversation?.id===conversationId) {
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
    if (!activeConversation || !user?.id) return;
    socketService.sendTypingStatus({
      conversationId: activeConversation.id,
      userId: user.id,
      isTyping
    });
  };

  useEffect(()=>{
   
    if(!user?.id){
      console.log("No user ID available, skipping loadConversations",user);
      return;
    }
    const socket=socketService.connect(user.id);
    console.log("Socket connected for user:", user.id);
    socketService.subscribe({
      receiveMessage:(newMessage:Message)=>{
        console.log('receive message from socket',newMessage);
        if (activeConversation?.id===newMessage.conversationId){
          setMessages(prevMessages=>{
            const existsmessage=prevMessages.some(msg=>msg._id===newMessage._id);
            if(!existsmessage){
              if(activeConversation.id===newMessage.conversationId){
                if(user.id!==newMessage.sender._id){
                  markMessagesAsRead();
                }
                return [...prevMessages,newMessage];
              }
            }
            
            return prevMessages;
          });
          if(user.id!==newMessage.sender._id){
            markMessagesAsRead();
          }
        }
        if(user.id!==newMessage.sender._id){
          setUnreadCount(prev=>prev+1);
        }
      },
        
      messagesRead:({conversationId,userId})=>{
        if(activeConversation?.id===conversationId && userId!==user.id){
          setMessages(prevMessages=> 
            prevMessages.map(msg=> 
              msg.sender._id===user.id ?{ ...msg,read:true}:msg
            )
          );
        }
      },
      
      userStatusChange:({userId,isOnline})=>{
        setConversations(prevConversations=> 
          prevConversations.map(conv=>({
            ...conv,
            participants:conv.participants.map(p=> 
              p.user.id===userId?{...p, isOnline }:p
            )
          }))
        );
      },
      
      userTyping:({conversationId,userId,isTyping})=>{
        if (activeConversation?.id === conversationId && userId !== user.id) {
          setTypingUsers(prev => ({ ...prev, [userId]: isTyping }));
        }
      }
    });
    
    console.log("About to call loadConversations");
    loadConversations().catch(err => {
      console.error("Error in loadConversations:", err);
    });
    
    return () => {
      socketService.disconnect();
    };
  }, [activeConversation,user,messages]);

  return {
    conversations,
    activeConversation,
    messages,
    loading,
    error,
    unreadCount,
    typingUsers,
    setActiveConversation:handleSetActiveConversation,
    sendMessage,
    loadMoreMessages,
    markMessagesAsRead,
    createConversation,
    deleteConversation,
    setTypingStatus
  };
};

export default useChat; 