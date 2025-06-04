import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/Main components/SideNav';
import Header from '../../components/Main components/Header';
import ErrorBoundary from '../../components/Main components/ErrorBoundary';
import ChatSidebar from '../../components/Conversation/ChatSidebar';
import ChatWindow from '../../components/Conversation/ChatWindow';
import { useChatContext } from '../../Contexts/ChatContext';

export default function ConversationPage() {
  const [searchTerm, setSearchTerm]=useState('');
  const navigate=useNavigate();
  const { activeConversation } = useChatContext();

  // Handle navigation for sidebar items
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  // Add debug logging to monitor the activeConversation in this component
  useEffect(() => {
    console.log('💬 ConversationPage activeConversation:', activeConversation?.id);
  }, [activeConversation]);

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
          <ChatSidebar />
          
          {/* Chat Window */}
          <ChatWindow />
        </div>
      </div>
    </div>
  );
} 