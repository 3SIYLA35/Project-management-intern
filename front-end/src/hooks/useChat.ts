import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [unreadCount,setundreadCcount]=useState<number>(0);
  const [typingUsers,setTypingUsers]=useState<Record<string,boolean>>({});
  const [currentPage,setCurrentPage]=useState<number>(1);
  const [totalPages, setTotalPages]=useState<number>(1);
  const activeConversationRef=useRef<converstation|null>(null);
  const userRef=useRef(user);
  const processedMessageIds=new Set<string>();

  useEffect(()=>{
    activeConversationRef.current=activeConversation;
    if(activeConversation){
      console.log('-------------------------joining conversation from useChat:',activeConversation.id);
      socketService.joinConversation(activeConversation.id);
      if(user?.id){
        socketService.markMessagesAsRead({conversationId:activeConversation.id,
          userId:user.id
        })
      }
    }
  },[activeConversation]);

  useEffect(()=>{
    userRef.current=user;
  },[user]);
  const loadConversations=async()=>{
    console.log('loadConversations');
        try {
      setLoading(true);
      const response=await conversationApi.getUserConversations();
      console.log('response from loadConversations',response);
      setConversations(response as converstation[]);
      console.log('conversations',conversations);
      const unreadResponse=await messageApi.getUnreadMessageCount();
      setundreadCcount(unreadResponse.unreadCount);
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
        setMessages(prevmessages=>[...response.messages,...prevmessages]);
      }
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    }catch(err:any){
      setError(err.message||'error loading messages');
    }finally{
      setLoading(false);
    }
  };
  const loadMoreMessages=async()=>{
    if (!activeConversation || currentPage >=totalPages)return;
    await loadMessages(activeConversation.id,currentPage+1);
  };

  const handleSetActiveConversation=(conversation:converstation|null)=>{
    console.log('handleSetAactiveconversation called with:',conversation?.id);
    if(activeConversation){
      console.log('leaving conversation from handleSetactiveconversation:',activeConversation.id);
      socketService.leaveConversation(activeConversation.id);
    }
    setActiveConversation(conversation);
    // activeConversationRef.current=conversation;
    setMessages([]);
    setCurrentPage(1);
    if(conversation){
      console.log('loading messages for conversation:',conversation.id);
      loadMessages(conversation.id);
      if(user?.id){
        console.log('marking messages as read for conversation:', conversation.id);
        markMessagesAsRead();
      }
    }
  };

  const sendMessage=async(content:string)=>{
    if(!activeConversation||!user?.id ||!content.trim())return;
    const tempId=`temp-${Date.now()}`;
    try {
      const optimisticmessage:Message={
        _id:tempId,
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
      processedMessageIds.add(tempId);
      setMessages(prevMessages=>[...prevMessages,optimisticmessage]);
      socketService.sendMessage({
        conversationId:activeConversation.id,
        sender:user.id,
        content:content.trim()
      });
    }catch(err:any){
      setError(err.message||'Error sending message');
      setMessages(prevMessages=>prevMessages.filter(msg=>msg._id!==tempId));
      console.log('removing tempId from processedIds:',tempId);
      processedMessageIds.delete(tempId);
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
      console.error('error marking messages as read:', err);
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
    if(!activeConversation || !user?.id) return;
    socketService.sendTypingStatus({
      conversationId:activeConversation.id,
      userId:user.id,
      isTyping
    });
  };

  useEffect(()=>{
   
    if(!user?.id){
      console.log("no user ID available skipping loadConversations",user);
      return;
    }
    console.log("connecting socket for user:",user?.id);
    const socket=socketService.connect(user.id);  
  socketService.subscribe({
      receiveMessage:(newMessage:Message)=>{
        console.log('receive_message event fired with message:',newMessage);
        processNewMessage(newMessage);
      },
      
      messagesRead:({conversationId,userId})=>{
        if(activeConversationRef.current?.id===conversationId && userRef.current && userId!==userRef.current.id){
          setMessages(prevMessages=> 
            prevMessages.map(msg=> 
              msg.sender._id===userRef.current?.id ?{ ...msg,read:true}:msg
            )
          );
        }
      },
      
      userStatusChange:({userId,isOnline})=>{
        setConversations(prevConversations=> 
          prevConversations.map(conv=>({
            ...conv,
            participants:conv.participants.map(p=> 
              p.user.id===userId?{...p,isOnline}:p
            )
          }))
        );
      },
      
      userTyping:({conversationId,userId,isTyping})=>{
        if(activeConversationRef.current?.id===conversationId && userRef.current && userId!==userRef.current.id){
          setTypingUsers(prev=>({ ...prev,[userId]:isTyping}));
        }
      },
      messageError:({error})=>{
        console.error('message error:',error);
        setError(error);
      }
    });
    loadConversations().catch(err => {
      console.error("error in loadConversations:",err);
    });
    
    return ()=>{
      socket.off('receive_message');
      socketService.disconnect();
    };
  },[user]);

  const processNewMessage=(newMessage:Message)=>{
    if(!newMessage || !newMessage.conversationId || !newMessage._id){
      console.error('invalid message received:',newMessage);
      return;
    }
    if(processedMessageIds.has(newMessage._id)){
      console.log('message already processed:',newMessage._id);
      return;
      }
    processedMessageIds.add(newMessage._id);
    const currentUser=userRef.current;
    const activeConvId=activeConversationRef.current?.id;
    const isforActiveconverstation=activeConvId===newMessage.conversationId;
    console.log('is for active conversation?',isforActiveconverstation);
    if(isforActiveconverstation){
      console.log('message is for current active conversation');
      setMessages(prevmessages=>{
        console.log('prevmessages',prevmessages);
        if(prevmessages.some(msg=>msg._id===newMessage._id)){
          console.log('duplicate message detected skipping');
          return prevmessages;
        }
        const tempIndex=prevmessages.findIndex(msg=> 
          msg._id && msg._id.startsWith('temp-') && 
          msg.sender._id===newMessage.sender._id &&
          msg.content===newMessage.content
        );
        
        if(tempIndex>=0){
          console.log('replacing temp message with realone at index:',tempIndex);
          const newMessages=[...prevmessages];
          newMessages[tempIndex]=newMessage;
          return newMessages;
        }
        console.log('adding new message to state, messages count:',prevmessages.length+1);
        return [...prevmessages,newMessage];
      });
      if(currentUser?.id && currentUser.id!==newMessage.sender._id){
        console.log('marking messages as read');
        markMessagesAsRead();
      }
    }else{
      console.log('message is not for current active conversation');
      if(currentUser?.id && currentUser.id!==newMessage.sender._id){
        console.log('increment unread count for other conversation');
        setundreadCcount(prev=>prev+1);
      }
    }
  };

  // Add cleanup function for processedMessageIds to prevent memory leaks
  useEffect(()=>{
    // Clean up processed message IDs periodically (every 5 minutes)
    const cleanupInterval = setInterval(() => {
      // Only keep the last 100 message IDs to prevent memory leaks
      if (processedMessageIds.size > 100) {
        console.log(`🧹 Cleaning up processed message IDs (current size: ${processedMessageIds.size})`);
        const idsToKeep = Array.from(processedMessageIds).slice(-100);
        processedMessageIds.clear();
        idsToKeep.forEach(id => processedMessageIds.add(id));
        console.log(`🧹 Processed message IDs after cleanup: ${processedMessageIds.size}`);
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => {
      clearInterval(cleanupInterval);
    };
  }, []);

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