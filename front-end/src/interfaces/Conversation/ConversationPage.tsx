import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/Main components/SideNav';
import Header from '../../components/Main components/Header';
import ErrorBoundary from '../../components/Main components/ErrorBoundary';
import ChatSidebar from '../../components/Conversation/ChatSidebar';
import ChatWindow from '../../components/Conversation/ChatWindow';
import { useChat } from '../../hooks/useChat';

export default function ConversationPage() {
  const [searchTerm, setSearchTerm]=useState('');
  const navigate=useNavigate();
  const { conversations,
    activeConversation,
    messages,
    loading,
    error,
    unreadCount,
    typingUsers,
    setActiveConversation,
    sendMessage,
    loadMoreMessages,
    markMessagesAsRead,
    createConversation,
    deleteConversation,
    setTypingStatus}=useChat();

  // Handle navigation for sidebar items
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ErrorBoundary>
        <SideNav activeItem="conversation" handleNavigation={handleNavigation} />
      </ErrorBoundary>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ErrorBoundary>
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            toggleProjectModal={() => {}}
            toggleJumpToProject={() => {}}
            sourcepage='conversation'
          />
        </ErrorBoundary>

        {/* Chat Interface */}
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Sidebar */}
          <ChatSidebar 
            selectedChat={activeConversation?._id || ''}
            onSelectChat={(chatId:string)=>setActiveConversation(conversations.find(conv=>conv._id===chatId) || null)}
            chats={conversations}
            loading={loading}
            unreadCount={unreadCount}
            typingUsers={typingUsers}
            setTypingStatus={setTypingStatus}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />
          
          {/* Chat Window */}
          <ChatWindow 
            selectedChat={activeConversation?._id || ''}
            messages={messages}
            loading={loading}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
} 