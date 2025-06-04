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
  const [unreadCount,setUnreadCount]=useState<number>(0);
  const [typingUsers,setTypingUsers]=useState<Record<string, boolean>>({});
  const [currentPage,setCurrentPage]=useState<number>(1);
  const [totalPages, setTotalPages]=useState<number>(1);

  // Create refs to hold current state values for use in socket callbacks
  const activeConversationRef = useRef<converstation|null>(null);
  const userRef = useRef(user);

  // Create a set to track already processed message IDs
  const processedMessageIds = new Set<string>();

  // Update refs when state changes
  useEffect(() => {
    activeConversationRef.current = activeConversation;
  }, [activeConversation]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

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
    console.log('🔄 handleSetActiveConversation called with:', conversation?.id);
    
    // Leave current conversation if any
    if(activeConversation){
      console.log('🚪 Leaving conversation from handleSetActiveConversation:', activeConversation.id);
      socketService.leaveConversation(activeConversation.id);
    }
    
    // Important: update both state and ref simultaneously
    setActiveConversation(conversation);
    activeConversationRef.current = conversation;
    
    // Log that we've set the active conversation
    console.log('✅ Active conversation set to:', conversation?.id);
    console.log('✅ Active conversation ref set to:', activeConversationRef.current?.id);
    
    // Reset messages and page when selecting a new conversation
    setMessages([]);
    setCurrentPage(1);
    
    // If a conversation was selected (not null)
    if(conversation){
      console.log('📋 Loading messages for conversation:', conversation.id);
      loadMessages(conversation.id);
      
      console.log('🚪 Joining conversation from handleSetActiveConversation:', conversation.id);
      socketService.joinConversation(conversation.id);
      
      if(user?.id){
        console.log('📑 Marking messages as read for conversation:', conversation.id);
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
      
      // Add the tempId to processed IDs to avoid duplicates when the real message comes back
      processedMessageIds.add(tempId);
      console.log('🔄 Adding optimistic message ID to processed set:', tempId);
      
      setMessages(prevMessages=>[...prevMessages,optimisticmessage]);
      socketService.sendMessage({
        conversationId:activeConversation.id,
        sender:user.id,
        content:content.trim()
      });
    }catch(err:any){
      setError(err.message||'Error sending message');
      setMessages(prevMessages=>prevMessages.filter(msg=>msg._id!==tempId));
      
      // Remove the tempId from processed IDs if we had to remove the optimistic message
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
   
    if (!user?.id) {
      console.log("❌ No user ID available, skipping loadConversations", user);
      return;
    }
    
    console.log("🔌 CONNECTING SOCKET for user:", user?.id);
    const socket = socketService.connect(user.id);
    
    // Debug socket connection events
    socket.on('connect', () => {
      console.log("✅ SOCKET CONNECTED with id:", socket.id);
    });
    
    socket.on('disconnect', () => {
      console.log("❌ SOCKET DISCONNECTED");
    });
    
    socket.on('connect_error', (error) => {
      console.error("🚨 SOCKET CONNECTION ERROR:", error);
    });
    
    // Add direct event listener for debugging
    socket.on('receive_message', (data) => {
      console.log("🚨 DIRECT SOCKET EVENT: receive_message", data);
    });
    
    console.log("🎧 Setting up socket event handlers");
    socketService.subscribe({
      receiveMessage:(newMessage:Message)=>{
        console.log('🔔 RECEIVE_MESSAGE EVENT FIRED with message:', newMessage);
        // Use the ref instead of the state value
        console.log('🔔 Current activeConversation (ref):', activeConversationRef.current?.id);
        console.log('🔔 Message conversationId:', newMessage.conversationId);
        
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
              p.user.id===userId?{...p, isOnline }:p
            )
          }))
        );
      },
      
      userTyping:({conversationId,userId,isTyping})=>{
        if (activeConversationRef.current?.id === conversationId && userRef.current && userId !== userRef.current.id) {
          setTypingUsers(prev => ({ ...prev, [userId]: isTyping }));
        }
      }
    });
    
    console.log("📋 About to call loadConversations");
    loadConversations().catch(err => {
      console.error("❌ Error in loadConversations:", err);
    });
    
    return () => {
      console.log("🧹 Cleaning up socket connection");
      socket.off('receive_message');
      socketService.disconnect();
    };
  }, [user]);

  const processNewMessage = (newMessage: Message) => {
    console.log('🔄 Processing new message:', newMessage);
    
    // First check to make sure we're not missing any required data
    if (!newMessage || !newMessage.conversationId || !newMessage._id) {
      console.error('❌ Invalid message received:', newMessage);
      return;
    }
    
    // Check if we've already processed this message ID
    if (processedMessageIds.has(newMessage._id)) {
      console.log('🔄 Message already processed, skipping:', newMessage._id);
      return;
    }
    
    // Add this message ID to the processed set
    processedMessageIds.add(newMessage._id);
    console.log('🔄 Adding message to processed set:', newMessage._id);
    
    // Use the ref instead of the state value
    const currentActiveConversation = activeConversationRef.current;
    const currentUser = userRef.current;
    
    // Get the active conversation ID from the ref
    const activeConvId = currentActiveConversation?.id;
    
    console.log('🔄 Active conversation ID (from ref):', activeConvId);
    console.log('🔄 Message conversation ID:', newMessage.conversationId);
    
    // Important: Do a direct string comparison
    const isForActiveConversation = activeConvId === newMessage.conversationId;
    console.log('🔄 Is for active conversation?', isForActiveConversation);
    
    // Check if this message belongs to the current active conversation
    if (isForActiveConversation) {
      console.log('✅ Message is for current active conversation');
      
      setMessages(prevMessages => {
        // Check for duplicate messages
        if (prevMessages.some(msg => msg._id === newMessage._id)) {
          console.log('⚠️ Duplicate message detected, skipping');
          return prevMessages;
        }
        
        // Check for temporary message to replace
        const tempIndex = prevMessages.findIndex(msg => 
          msg._id && msg._id.toString().startsWith('temp-') && 
          msg.sender._id === newMessage.sender._id &&
          msg.content === newMessage.content
        );
        
        if (tempIndex >= 0) {
          console.log('🔄 Replacing temp message with real one at index:', tempIndex);
          const newMessages = [...prevMessages];
          newMessages[tempIndex] = newMessage;
          return newMessages;
        }
        
        console.log('➕ Adding new message to state, messages count:', prevMessages.length + 1);
        return [...prevMessages, newMessage];
      });
      
      // Mark messages as read if they're from another user
      if (currentUser?.id && currentUser.id !== newMessage.sender._id) {
        console.log('📝 Marking messages as read');
        markMessagesAsRead();
      }
    } else {
      console.log('❌ Message is NOT for current active conversation');
      
      // If this message is for another conversation, update the unread count
      if (currentUser?.id && currentUser.id !== newMessage.sender._id) {
        console.log('🔔 Incrementing unread count for other conversation');
        setUnreadCount(prev => prev + 1);
      }
    }
  };

  // Add cleanup function for processedMessageIds to prevent memory leaks
  useEffect(() => {
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