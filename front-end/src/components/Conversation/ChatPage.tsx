import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import './ChatStyles.css';
import { converstation } from '../Profile/types';
import { Message } from '../Profile/types';

interface chatpageProps{
  selectedChat:string;
  onSelectChat:(chatId:string)=>void;
  chats:converstation[];
  activeConversation:converstation|null;
  setActiveConversation:(conversation:converstation|null)=>void;
  messages:Message[];
  loading:boolean;
  sendMessage:(content:string)=>void;
  unreadCount:number;
  typingUsers:Record<string,boolean>;
  setTypingStatus:(isTyping:boolean)=>void;
}
const ChatPage: React.FC<chatpageProps>=({selectedChat,
  onSelectChat,
  chats,
  activeConversation,
  setActiveConversation,
  messages,
  loading,
  sendMessage,
  unreadCount,
  typingUsers,
  setTypingStatus})=>{
  return (
    <div className="flex h-screen bg-gray-900">
      <ChatSidebar />
      <ChatWindow 
       />
    </div>
  );
};

export default ChatPage; 