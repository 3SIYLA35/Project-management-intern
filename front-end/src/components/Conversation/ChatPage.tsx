import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import './ChatStyles.css';
import { Conversation } from '@/api/conversationApi';
import { Message } from '@/api/messageApi';

interface chatpageProps{
  selectedChat:string;
  onSelectChat:(chatId:string)=>void;
  chats:Conversation[];
  activeConversation:Conversation|null;
  setActiveConversation:(conversation:Conversation|null)=>void;
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
      <ChatSidebar 
        selectedChat={selectedChat}
        onSelectChat={onSelectChat}
        chats={chats}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        loading={loading}
        unreadCount={unreadCount}
        typingUsers={typingUsers}
        setTypingStatus={setTypingStatus}
      />
      <ChatWindow 
        selectedChat={selectedChat}
        messages={messages}
        loading={loading}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatPage; 