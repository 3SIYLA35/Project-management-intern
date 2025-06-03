import { io, Socket } from 'socket.io-client';
import { Message } from './messageApi';
import { use } from 'react';

let socket: Socket|null=null;

const SOCKET_URL='http://localhost:8000';


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
    if(!socket ||!socket.connected){
      socket=io(SOCKET_URL);
      socket.on('connect',()=>{
        console.log('socket connected');
        socket?.emit('user_online',userId)
      })
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
    }
  },
  
  subscribe:(eventHandlers:SocketEventHandlers):void=>{
    if(!socket){
      console.error('socket not connected Call connect() first');
      return;
    }
    if(eventHandlers.receiveMessage){
      socket.on('receive_message',eventHandlers.receiveMessage);
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
  },
  
  leaveConversation:(conversationId:string):void=>{
    if(!socket){
      console.error('socket not connected Call connect() first');
      return;
    }
    
    socket.emit('leave_conversation', conversationId);
  },
  sendMessage:(data:{conversationId:string;sender:string;content:string}):void=>{
    if(!socket){
      console.error('socket not connected Call connect() first');
      return;
    }
    console.log('send message from socketService',data);
    socket.emit('send_message',data);
  },
  
  markMessagesAsRead:(data:{conversationId:string;userId:string}):void=>{
    if(!socket){
      console.error('socket not connected Call connect() first');
      return;
    }
    
    socket.emit('mark_messages_read', data);
  },
  
  sendTypingStatus:(data:{conversationId:string;userId:string;isTyping:boolean}):void=>{
    if(!socket){
      console.error('socket not connected Call connect() first');
      return;
    }
    socket.emit('typing', data);
  }
};

export default socketService; 