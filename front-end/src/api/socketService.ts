import { io, Socket } from 'socket.io-client';
import { Message } from './messageApi';
import { use } from 'react';

let socket: Socket|null=null;

const SOCKET_URL='http://localhost:8000';

// Add a unique ID for this service instance
const SERVICE_ID = Math.random().toString(36).substring(2, 9);

// Track currently joined rooms
let activeRooms = new Set<string>();

export type SocketEventHandlers={
  receiveMessage?:(message: Message)=>void;
  messagesRead?:(data:{conversationId:string;userId:string })=>void;
  userStatusChange?:(data:{ userId:string;isOnline:boolean})=>void;
  userTyping?:(data:{conversationId:string;userId:string;isTyping:boolean})=>void;
  messageError?:(error:{error:string})=>void;
  connect?():void;
  disconnect?():void;
};

const socketService={
  connect:(userId:string):Socket=>{
    console.log(`🔌 [socketService:${SERVICE_ID}] connect called for userId:`, userId);
    
    if(!socket ||!socket.connected){
      console.log(`📡 [socketService:${SERVICE_ID}] Creating new socket connection to:`, SOCKET_URL);
      socket=io(SOCKET_URL);
      
      socket.on('connect',()=>{
        console.log(`✅ [socketService:${SERVICE_ID}] Socket connected with ID:`, socket?.id);
        console.log(`📤 [socketService:${SERVICE_ID}] Emitting user_online event for user:`, userId);
        socket?.emit('user_online',userId);
        
        // Rejoin all active rooms on reconnect
        if (activeRooms.size > 0) {
          console.log(`🔄 [socketService:${SERVICE_ID}] Rejoining ${activeRooms.size} rooms after reconnect`);
          activeRooms.forEach(roomId => {
            console.log(`🚪 [socketService:${SERVICE_ID}] Rejoining room:`, roomId);
            socket?.emit('join_conversation', roomId);
          });
        }
      });
      
      socket.on('reconnect', () => {
        console.log(`🔄 [socketService:${SERVICE_ID}] Socket reconnected with ID:`, socket?.id);
        console.log(`📤 [socketService:${SERVICE_ID}] Re-emitting user_online event for user:`, userId);
        socket?.emit('user_online', userId);
      });
      
      if (socket) {
        socket.on('connect_error', (error) => {
          console.error(`🔴 [socketService:${SERVICE_ID}] Socket connection error:`, error.message);
        });
      }
    } else {
      console.log(`⚠️ [socketService:${SERVICE_ID}] Socket already connected, reusing existing connection`);
    }
    
    socket.on('disconnect',()=>{
      console.log(`❌ [socketService:${SERVICE_ID}] Socket disconnected`);
    });
    
    return socket;
  },
  
  disconnect:():void=>{
    if(socket){
      console.log("🔌 Disconnecting socket");
      socket.disconnect();
      socket=null;
    } else {
      console.log("⚠️ No socket to disconnect");
    }
  },
  
  subscribe:(eventHandlers:SocketEventHandlers):void=>{
    if(!socket){
      console.error('❌ Socket not connected. Call connect() first');
      return;
    }
    
    console.log("🎧 Setting up event handlers:", Object.keys(eventHandlers).join(', '));
    
    if(eventHandlers.receiveMessage){
      console.log("🎧 Subscribing to 'receive_message' event");
      socket.off('receive_message');
      socket.on('receive_message', (data) => {
        console.log("📩 Raw 'receive_message' event received:", data);
        eventHandlers.receiveMessage?.(data);
      });
    }
    
    if(eventHandlers.messagesRead){
      console.log("🎧 Subscribing to 'messages_read' event");
      socket.on('messages_read',eventHandlers.messagesRead);
    }
    if(eventHandlers.userStatusChange){
      console.log("🎧 Subscribing to 'user_status_change' event");
      socket.on('user_status_change',eventHandlers.userStatusChange);
    }    
    if(eventHandlers.userTyping){
      console.log("🎧 Subscribing to 'user_typing' event");
      socket.on('user_typing', eventHandlers.userTyping);
    }
    
    if(eventHandlers.messageError){
      console.log("🎧 Subscribing to 'message_error' event");
      socket.on('message_error',eventHandlers.messageError);
    }
    if(eventHandlers.connect){
      console.log("🎧 Subscribing to 'connect' event");
      socket.on('connect',eventHandlers.connect);
    }
    
    if(eventHandlers.disconnect){
      console.log("🎧 Subscribing to 'disconnect' event");
      socket.on('disconnect', eventHandlers.disconnect);
    }
  },
  
  unsubscribe:(eventName:string):void=>{
    if(!socket){
      console.error('❌ Socket not connected. Call connect() first');
      return;
    }
    
    console.log(`🔕 Unsubscribing from '${eventName}' event`);
    socket.off(eventName);
  },
  
  
  joinConversation:(conversationId:string):void=>{
    if(!socket){
      console.error(`❌ [socketService:${SERVICE_ID}] Socket not connected. Call connect() first`);
      return;
    }
    
    console.log(`🚪 [socketService:${SERVICE_ID}] Joining conversation room:`, conversationId);
    socket.emit('join_conversation', conversationId);
    activeRooms.add(conversationId);
  },
  
  leaveConversation:(conversationId:string):void=>{
    if(!socket){
      console.error(`❌ [socketService:${SERVICE_ID}] Socket not connected. Call connect() first`);
      return;
    }
    
    console.log(`🚪 [socketService:${SERVICE_ID}] Leaving conversation room:`, conversationId);
    socket.emit('leave_conversation', conversationId);
    activeRooms.delete(conversationId);
  },
  
  sendMessage:(data:{conversationId:string;sender:string;content:string}):void=>{
    if(!socket){
      console.error('❌ Socket not connected. Call connect() first');
      return;
    }
    
    console.log('📤 Sending message:', data);
    socket.emit('send_message',data);
  },
  
  markMessagesAsRead:(data:{conversationId:string;userId:string}):void=>{
    if(!socket){
      console.error('❌ Socket not connected. Call connect() first');
      return;
    }
    
    console.log('📑 Marking messages as read:', data);
    socket.emit('mark_messages_read', data);
  },
  
  sendTypingStatus:(data:{conversationId:string;userId:string;isTyping:boolean}):void=>{
    if(!socket){
      console.error('❌ Socket not connected. Call connect() first');
      return;
    }
    
    console.log('⌨️ Sending typing status:', data);
    socket.emit('typing', data);
  }
};

export default socketService; 