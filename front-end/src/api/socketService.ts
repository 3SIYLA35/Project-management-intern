import { io, Socket } from 'socket.io-client';
import { Message } from '../components/Profile/types';
import { use } from 'react';
import { messagesApi } from '@/adapters/messagesAdapter';

let socket: Socket|null=null;

const SOCKET_URL='http://localhost:8000';

//id  unique to the socket session 
const SERVICE_ID=Math.random().toString(36).substring(2, 9);
let activerooms=new Set<string>();

export type SocketEventHandlers={
  receiveMessage?:(message:messagesApi)=>void;
  messagesRead?:(data:{conversationId:string;userId:string })=>void;
  userStatusChange?:(data:{ userId:string;isOnline:boolean})=>void;
  userTyping?:(data:{conversationId:string;userId:string;isTyping:boolean})=>void;
  messageError?:(error:{error:string})=>void;
  connect?():void;
  recieveMessageOutsideConversation?:(data:{lastmessage:string;conversationId:string;unreadCount:number})=>void;
  disconnect?():void;
};

const socketService={
  connect:(userId:string):Socket=>{
    console.log(`socketService:${SERVICE_ID} connect called for userId:`,userId);
    if(!socket ||!socket.connected){
      socket=io(SOCKET_URL);
      socket.on('connect',()=>{
        console.log(`socketService:${SERVICE_ID} socket connected with ID:`,socket?.id);
        console.log(`socketService:${SERVICE_ID} emitting user_online event for user:`,userId);
        socket?.emit('user_online',userId);
        
        // rejoin all active rooms on reconnect
        if(activerooms.size>0){
          console.log(`socketService:${SERVICE_ID} Rejoining ${activerooms.size} rooms after reconnect`);
          activerooms.forEach(roomId => {
            console.log(`socketService:${SERVICE_ID} Rejoining room:`, roomId);
            socket?.emit('join_conversation', roomId);
          });
        }
      });
      
      socket.on('reconnect', () => {
        console.log(`socketService:${SERVICE_ID}] Socket reconnected with ID:`,socket?.id);
        console.log(`socketService:${SERVICE_ID}] Re-emitting user_online event for user:`,userId);
        socket?.emit('user_online', userId);
      });
      
      if (socket) {
        socket.on('connect_error', (error)=>{
          console.error(`socketService:${SERVICE_ID} Socket connection error:`, error.message);
        });
      }
    } else {
      console.log(`socketService:${SERVICE_ID} Socket already connected`);
    }
    
    socket.on('disconnect',()=>{
      console.log('socket disconnected');
    })
    return socket;
  },
  disconnect:():void=>{
    if(socket){
      socket.disconnect();
      socket=null;
    } else {
      console.log("no  socket to disconnect");
    }
  },
  
  subscribe:(eventHandlers:SocketEventHandlers):void=>{
    if(!socket){
      console.error('socket not connected Call connect() first');
      return;
    }
    
    
    if(eventHandlers.receiveMessage){
      socket.off('receive_message');
      socket.on('receive_message', (data) => {
        console.log("📩 Raw 'receive_message' event received:", data);
        eventHandlers.receiveMessage?.(data);
      });
    }
    if(eventHandlers.messagesRead){
      socket.on('messages_read',eventHandlers.messagesRead);
    }
    if(eventHandlers.userStatusChange){
      socket.on('user_status_change',eventHandlers.userStatusChange);
    }    
    if(eventHandlers.userTyping){
      socket.on('user_typing', eventHandlers.userTyping);
    }
    
    if(eventHandlers.messageError){
      socket.on('message_error',eventHandlers.messageError);
    }
    if(eventHandlers.connect){
      socket.on('connect',eventHandlers.connect);
    }
    if(eventHandlers.recieveMessageOutsideConversation){
      socket.on('recieve_message_outside_conversation',eventHandlers.recieveMessageOutsideConversation);
    }
    
    if(eventHandlers.disconnect){
      socket.on('disconnect', eventHandlers.disconnect);
    }
  },
  
  unsubscribe:(eventName:string):void=>{
    if(!socket){
      console.error('socket not connected Call connect() first');
      return;
    }
    
    socket.off(eventName);
  },
  
  
  joinConversation:(conversationId:string):void=>{
    if(!socket){
      console.error('socket not connected Call connect() first');
      return;
    }
    
    socket.emit('join_conversation', conversationId);
    activerooms.add(conversationId);
  },
  
  leaveConversation:(conversationId:string):void=>{
    if(!socket){
      console.error(`socketService:${SERVICE_ID} socket not connected `);
      return;
    }
    
    console.log(`socketService:${SERVICE_ID}] leaving conversation room:`,conversationId);
    socket.emit('leave_conversation',conversationId);
    activerooms.delete(conversationId);
  },
  
  sendMessage:(data:{conversationId:string;sender:string;content:string}):void=>{
    if(!socket){
      console.error('socket not connected');
      return;
    }
    console.log('send message from socketService',data);
    socket.emit('send_message',data);
  },
  
  markMessagesAsRead:(data:{conversationId:string;userId:string}):void=>{
    if(!socket){
      console.error('socket not connected ');
      return;
    }   
    socket.emit('mark_messages_read', data);
  },
  
  sendTypingStatus:(data:{conversationId:string;userId:string;isTyping:boolean}):void=>{
    if(!socket){
      console.error('socket not connected');
      return;
    }
    console.log('sending typing status:',data);
    socket.emit('typing',data);
  }
};

export default socketService; 