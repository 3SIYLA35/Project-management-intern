import { useEffect, useRef } from 'react';
import socketService from '../../api/socketService';
import { useProfileContext } from '../../Contexts/ProfileContext';
import { useChatContext } from '../../Contexts/ChatContext';
import { Socket } from 'socket.io-client';

// Create a unique ID for this component instance to help with debugging
const INSTANCE_ID = Math.random().toString(36).substring(2, 9);

const SocketInitializer:React.FC=()=>{
   const {profile} = useProfileContext();
   const {activeConversation, conversations} = useChatContext();
   const socketRef = useRef<Socket|null>(null);
   
   // Ref to track the current active conversation ID
   const activeConversationIdRef = useRef<string|undefined>(undefined);
   
  // Effect for socket connection
  useEffect(()=>{
      console.log(`🔄 [SocketInitializer:${INSTANCE_ID}] effect running with profile:`, profile?.id);
      
      if (!profile?.id) {
        console.log(`⚠️ [SocketInitializer:${INSTANCE_ID}] No profile ID available, skipping socket connection`);
        return;
      }
      
      console.log(`🔌 [SocketInitializer:${INSTANCE_ID}] Connecting socket for user:`, profile.id);
      const socket = socketService.connect(profile.id);
      socketRef.current = socket;
      
      // Setup direct event listeners for debugging
      socket.on('connect', () => {
        console.log(`✅ [SocketInitializer:${INSTANCE_ID}] Socket connected with ID:`, socket.id);
        
        // Re-join active conversation on reconnect
        if (activeConversationIdRef.current) {
          console.log(`🔄 [SocketInitializer:${INSTANCE_ID}] Rejoining conversation after reconnect:`, activeConversationIdRef.current);
          socketService.joinConversation(activeConversationIdRef.current);
        }
      });
      
      // Add explicit listener for receive_message
      socket.on('receive_message', (data) => {
        console.log(`📩 [SocketInitializer:${INSTANCE_ID}] received message:`, data);
        console.log(`📩 Current active conversation (ref):`, activeConversationIdRef.current);
      });
      
      return ()=>{
        console.log(`🧹 [SocketInitializer:${INSTANCE_ID}] Cleaning up socket connection`);
        socket.off('connect');
        socket.off('receive_message');
        socketService.disconnect();
      };
    }, [profile]);
    
  // Separate effect for handling conversation changes
  useEffect(() => {
    if (!profile?.id || !socketRef.current) return;
    
    console.log(`🔄 [SocketInitializer:${INSTANCE_ID}] Active conversation changed to:`, activeConversation?.id);
    
    // Update the ref with the current active conversation ID
    activeConversationIdRef.current = activeConversation?.id;
    
    // Leave any previous conversation
    if (socketRef.current) {
      conversations.forEach(conv => {
        if (conv.id !== activeConversation?.id) {
          console.log(`🚪 [SocketInitializer:${INSTANCE_ID}] Leaving conversation:`, conv.id);
          socketService.leaveConversation(conv.id);
        }
      });
    }
    
    // Join new conversation
    if (activeConversation) {
      console.log(`🚪 [SocketInitializer:${INSTANCE_ID}] Joining conversation:`, activeConversation.id);
      socketService.joinConversation(activeConversation.id);
    }
  }, [activeConversation, profile, conversations]);

  // Log component unmounting
  useEffect(() => {
    return () => {
      console.log(`🧹 [SocketInitializer:${INSTANCE_ID}] Component unmounting`);
    };
  }, []);

  return null;
};

export default SocketInitializer; 