import React, { useState, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import TypingIndicator from './TypingIndicator';
import { converstation, Participant } from '../Profile/types';
import './ChatStyles.css';
import { useProfile } from '../../hooks/useProfile';
import { useChatContext } from '../../Contexts/ChatContext';



const ChatSidebar:React.FC=()=>{
    const{ 
      loading,
      error,
      createConversation,
      conversations,
      activeConversation,
      setActiveConversation,
      typingUsers,
      unreadCount,
      setTypingStatus,
    }=useChatContext();

    useEffect(()=>{
      console.log('conversations---------------',conversations);
    },[]);
  const {profile}=useProfile();
  const user=profile;
  const [searchQuery,setSearchQuery]=useState('');
  const [showNewChatModal,setShowNewChatModal]=useState(false);
  const [newChatParticipantId,setNewChatParticipantId]=useState('');
  const [filteredConversations,setFilteredConversations]=useState(conversations);
  const [todayConversations,setTodayConversations]=useState<converstation[]>([]);
  const [yesterdayConversations,setYesterdayConversations]=useState<converstation[]>([]);
  const [olderConversations,setOlderConversations]=useState<converstation[]>([]);

  // Select a conversation
  const handleSelectConversation=(conversation:converstation)=>{
    console.log('💬 Selecting conversation:', conversation);
    
    // Explicitly log the ID to debug
    console.log('💬 Selected conversation ID:', conversation.id);
    
    // For debugging purposes
    console.log('💬 Current active conversation before change:', activeConversation?.id);
    
    // Make sure we're explicitly setting the conversation in state
    setActiveConversation(conversation);
    
    // Log to confirm setting was triggered
    console.log('💬 Active conversation should now be set to:', conversation.id);
    
    // Add a timeout to check if the active conversation was actually updated
    setTimeout(() => {
      console.log('💬 Active conversation after timeout:', activeConversation?.id);
    }, 100);
  };

  // Create a new conversation
  const handleCreateConversation = async () => {
    if (!newChatParticipantId.trim()) return;

    try {
      const newConversation = await createConversation([newChatParticipantId]);
      if (newConversation) {
        setActiveConversation(newConversation as unknown as converstation);
        setShowNewChatModal(false);
        setNewChatParticipantId('');
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };


  const getOtherParticipants=(conversation:converstation)=>{
    // console.log('conversation',conversation);
    return conversation.participants.filter(p=>p.user.id!==user?.id);
  };

  // Function to format timestamp
  const formatMessageTime = (timestamp: string) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Format time as HH:MM AM/PM
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // If it's today
    if (date.toDateString() === now.toDateString()) {
      return timeString;
    }
    
    // If it's yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${timeString}`;
    }
    
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Check if there are any unread messages in a conversation
  const hasUnreadMessages = (conversation: converstation) => {
    // This would need to be implemented based on your data structure
    // For now, we'll just return false
    return false;
  };

  // Count unread messages in a conversation
  const countUnreadMessages = (conversation: converstation) => {
    // This would need to be implemented based on your data structure
    // For now, we'll just return 0
    return 0;
  };

  // Check if someone is typing in a conversation
  const isTypingInConversation = (conversation: converstation) => {
    return Object.keys(typingUsers).some(userId => 
      conversation.participants.some((p:Participant) => p.user.id === userId)
    );
  };

  useEffect(()=>{
    console.log('conversations use effetct2---------------',conversations);
    setFilteredConversations(conversations);
  },[conversations]);
  
  // Separate useEffect to process categorized conversations after filteredConversations is set
  useEffect(() => {
    // Process categorized conversations
    const processConversations = () => {
      const filtredconv = filteredConversations;
      
      // Set today's conversations
      setTodayConversations(filtredconv.filter(conv=>{
        const date=new Date(conv.updatedAt);
        const today=new Date();
        return date.toDateString()===today.toDateString();
      }));
      
      // Set yesterday's conversations
      setYesterdayConversations(filtredconv.filter(conv=>{  
        const date=new Date(conv.updatedAt);
        const today=new Date();
        const yesterday=new Date(today);
        yesterday.setDate(yesterday.getDate()-1);
        return date.toDateString()===yesterday.toDateString();
      }));
      
      // Set older conversations
      setOlderConversations(filtredconv.filter(conv=>{
        const date=new Date(conv.updatedAt);
        const today=new Date();
        const yesterday=new Date(today);
        yesterday.setDate(yesterday.getDate()-1);
        return date.toDateString()!==today.toDateString() && date.toDateString()!==yesterday.toDateString();
      }));
    };
    
    processConversations();
  }, [filteredConversations]);

  if (loading){
  // console.log('loading',loading);
    return(
      <div className="w-80 bg-gray-850 border-r border-gray-800 flex items-center justify-center">
        <div className="text-gray-400">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-850 border-r border-gray-800 overflow-y-auto hide-scrollbar">
      {/* Header with unread count */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h2 className="text-lg font-semibold flex items-center">
          Messages
          {unreadCount>0&& (
            <span className="ml-2 bg-blue-600 text-xs rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </h2>
        <button 
          className="text-gray-400 hover:text-white"
          onClick={() => setShowNewChatModal(true)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Search bar */}
      <div className="p-4 flex items-center">
        <div className="relative w-[85%]">
          <input 
            type="text" 
            placeholder="Find a conversation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-gray-200 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter button */}
        <button className="flex items-center justify-center pl-4">
          <svg className="w-5 h-5 hover:text-gray-200 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      </div>

      {/* converstation list */}
      <div>
        {/* Today's conversations */}
        {todayConversations.length>0&& (
          <>
            <div className="px-4 py-2 text-xs font-medium text-gray-500">Today</div>
            {todayConversations.map(conversation=>(
              <div 
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-800 ${activeConversation?.id === conversation.id ? 'bg-gray-800' : ''}`}
              >
                <div className="flex">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full mr-4 bg-gray-700 flex items-center justify-center text-white">
                      <img src={getOtherParticipants(conversation)[0]?.user?.avatar}
                       alt={getOtherParticipants(conversation)[0]?.user?.name || '?'}
                       className='w-10 h-10 rounded-full' 
                        />
                      
                    </div>
                    {getOtherParticipants(conversation)[0]?.isOnline && (
                      <div className="absolute bottom-0 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-850"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-white truncate">
                        {getOtherParticipants(conversation).map(p=>p.user?.name).join(' & ')}
                      </h3>
                      <span className="text-xs text-gray-500">{formatMessageTime(conversation.updatedAt.toISOString() )}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      {isTypingInConversation(conversation) ? (
                        <p className="text-xs text-gray-400 truncate">
                          <TypingIndicator userName={getOtherParticipants(conversation)[0]?.user?.name} />
                        </p>
                      ):(
                        <p className="text-xs text-gray-400 truncate">
                          {conversation.lastMessage||''}
                        </p>
                      )}
                      {conversation.unreadCount>0?(
                        
                          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                            {conversation.unreadCount||''}
                          </span>
                        
                      ):''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Yesterday's conversations */}
        {yesterdayConversations.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-medium text-gray-500">Yesterday</div>
            {yesterdayConversations.map(conversation => (
              <div 
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-800 ${activeConversation?.id === conversation.id ? 'bg-gray-800' : ''}`}
              >
                <div className="flex">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full mr-4 bg-gray-700 flex items-center justify-center text-white">
                      {getOtherParticipants(conversation)[0]?.user?.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    {getOtherParticipants(conversation)[0]?.isOnline && (
                      <div className="absolute bottom-0 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-850"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-white truncate">
                        {getOtherParticipants(conversation).map(p => p.user?.name || 'User').join(' & ')}
                      </h3>
                      <span className="text-xs text-gray-500">{formatMessageTime(conversation?.updatedAt?.toISOString()||'')}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-400 truncate">
                        {/* This would display the last message text */}
                        {/* {conversation.lastMessage?.text || 'No messages yet'} */}
                      </p>
                      {hasUnreadMessages(conversation) && (
                        <div className="ml-auto">
                          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                            {countUnreadMessages(conversation)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        
        {/* Older conversations */}
        {olderConversations.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-medium text-gray-500">Earlier</div>
            {olderConversations.map(conversation => (
              <div 
                  key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-800 ${activeConversation?.id === conversation.id ? 'bg-gray-800' : ''}`}
              >
                <div className="flex">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full mr-4 bg-gray-700 flex items-center justify-center text-white">
                      {getOtherParticipants(conversation)[0]?.user?.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    {getOtherParticipants(conversation)[0]?.isOnline && (
                      <div className="absolute bottom-0 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-850"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-white truncate">
                        {getOtherParticipants(conversation).map(p => p.user?.name || 'User').join(' & ')}
                      </h3>
                      <span className="text-xs text-gray-500">{formatMessageTime(conversation.updatedAt.toISOString())}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-400 truncate">
                        {/* This would display the last message text */}
                        {/* {conversation.lastMessage?.text || 'No messages yet'} */}
                      </p>
                      {hasUnreadMessages(conversation) && (
                        <div className="ml-auto">
                          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                            {countUnreadMessages(conversation)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {filteredConversations.length === 0 && (
          <div className="px-4 py-8 text-center">
            <div className="text-gray-500">No conversations found</div>
            <button 
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setShowNewChatModal(true)}
            >
              Start a new chat
            </button>
          </div>
        )}
      </div>

      {/* New chat modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-850 rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium text-white mb-4">Start a new conversation</h3>
            <input
              type="text"
              placeholder="Enter user ID"
              value={newChatParticipantId}
              onChange={(e) => setNewChatParticipantId(e.target.value)}
              className="w-full bg-gray-800 text-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                onClick={() => setShowNewChatModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleCreateConversation}
                disabled={!newChatParticipantId.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSidebar; 