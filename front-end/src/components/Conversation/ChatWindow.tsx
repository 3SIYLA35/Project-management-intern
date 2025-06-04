import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faFaceSmile, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './ChatStyles.css';
import { useChat } from '../../hooks/useChat';
import TypingIndicator from './TypingIndicator';
import { Message } from '../../api/messageApi';
import { useProfile } from '../../hooks/useProfile';
import { Participant } from '../Profile/types';
import { useChatContext } from '../../Contexts/ChatContext';



const ChatWindow:React.FC=()=>{
  const { 
    activeConversation, 
    typingUsers,
      setTypingStatus,
    messages,
    loading,
    sendMessage
  }=useChatContext();
  const {profile}=useProfile();
  const user=profile;
  const [newMessage,setNewMessage]=useState('');
  const [showEmojiPicker,setShowEmojiPicker]=useState(false);
  const messagesEndRef=useRef<HTMLDivElement>(null);
  const [isTyping,setIsTyping]=useState(false);
  const typingTimeoutRef=useRef<NodeJS.Timeout | null>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    console.log('📜 ChatWindow messages updated:', messages.length);
    console.log('📜 ChatWindow activeConversation:', activeConversation?.id);
    
    if (activeConversation) {
      console.log('✅ Active conversation in ChatWindow:', activeConversation.id);
    } else {
      console.log('❌ No active conversation in ChatWindow');
    }
    
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversation]);

  // Add additional useEffect to log when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      console.log('🔄 ChatWindow active conversation changed to:', activeConversation.id);
      console.log('🔄 ChatWindow participants:', activeConversation.participants.map(p => p.user.id));
    }
  }, [activeConversation]);

  // Handle typing indicator
  useEffect(() => {
    if (isTyping) {
      setTypingStatus(true);
      
      // Clear previous timeout if exists
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout to stop typing indicator after 3 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setTypingStatus(false);
      }, 3000);
    }
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isTyping, setTypingStatus]);

  // Add a useEffect to log when messages are updated
  useEffect(() => {
    if (messages.length > 0) {
      console.log('💬 ChatWindow received messages:', messages.length);
      console.log('💬 First message:', messages[0].content);
      console.log('💬 Last message:', messages[messages.length - 1].content);
    } else {
      console.log('💬 ChatWindow has no messages');
    }
  }, [messages]);

  // When the component mounts, log that it's ready
  useEffect(() => {
    console.log('💬 ChatWindow component mounted');
    console.log('💬 Initial activeConversation:', activeConversation?.id);
    
    return () => {
      console.log('💬 ChatWindow component unmounting');
    };
  }, []);

  const handleSendMessage=()=>{
    if(newMessage.trim()==='') return;
    setIsTyping(false);
    setTypingStatus(false);
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else {
      // Set typing status
      setIsTyping(true);
    }
  };

  const handleInputChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setNewMessage(e.target.value);
    setIsTyping(true);
  };

  // Function to format message timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to check if message is from current user
  const isCurrentUserMessage = (message: Message) => {
    return message.sender._id === user?.id;
  };

  // Function to get participant name from conversation
  const getParticipantName = (participantId: string) => {
    if (!activeConversation) return 'User';
    
    // This is simplified - you would need to fetch user details or store them in the conversation
    return activeConversation.participants.find((p:Participant) => p.user.id === participantId)?.user?.name || 'User';
  };

  // Function to get online status
  const getOnlineStatus = (participantId: string) => {
    if (!activeConversation) return false;
    
    return activeConversation.participants.find((p:Participant) => p.user.id === participantId)?.isOnline || false;
  };

  if (!activeConversation){
    // console.log('activeConversation from ChatWindow',activeConversation);
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-300">Chat with your team</h3>
          <p className="mt-1 text-sm text-gray-500">Select a chat from the sidebar to start messaging.</p>
        </div>
      </div>
    );
  }

  // Find the other participant(s) in the conversation
  const otherParticipants = activeConversation.participants.filter(
    (p:Participant) => p.user.id !== user?.id
  );
  
  // For simplicity, we'll just use the first other participant for the header
  const chatPartner = otherParticipants[0];

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Chat header */}
      <div className="border-b border-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full mr-3 bg-gray-700 flex items-center justify-center text-white">
            {getParticipantName(chatPartner?.user.id).charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">{getParticipantName(chatPartner?.user.id)}</h2>
            <p className={`text-xs ${getOnlineStatus(chatPartner?.user.id) ? 'text-green-500' : 'text-gray-400'}`}>
              {/* {getOnlineStatus(chatPartner?.id) ? 'Online' : 'Offline'} */}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="text-gray-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-gray-400 text-2xl" />
          </div>
        ) : (
          <>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 my-4">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((message) => (
                <div 
                  key={message._id} 
                  className={`flex ${isCurrentUserMessage(message) ? 'justify-end' : 'justify-start'}`}
                >
                  {!isCurrentUserMessage(message) && (
                    <div className="h-8 w-8 rounded-full mr-2 self-end bg-gray-700 flex items-center justify-center text-white">
                      {message.sender.name ? message.sender.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isCurrentUserMessage(message) ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg px-4 py-2`}>
                    <p className="text-sm text-white">{message.content}</p>
                    <div className={`text-xs mt-1 ${isCurrentUserMessage(message) ? 'text-blue-200' : 'text-gray-400'} text-right flex items-center justify-end gap-1`}>
                      {formatTimestamp(message.createdAt)}
                      {isCurrentUserMessage(message) && message.read && (
                        <span className="text-blue-200">✓</span>
                      )}
                    </div>
                  </div>
                  {isCurrentUserMessage(message) && (
                    <div className="h-8 w-8 rounded-full ml-2 self-end bg-blue-500 flex items-center justify-center text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'Y'}
                    </div>
                  )}
                </div>
              ))
            )}
            
            {/* Show typing indicator if someone is typing */}
            {Object.keys(typingUsers).length > 0 && (
              <TypingIndicator userName={getParticipantName(Object.keys(typingUsers)[0])} />
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message input */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-800 rounded-lg p-2">
            <textarea
              placeholder="Type a message..."
              value={newMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="w-full bg-transparent text-white resize-none focus:outline-none min-h-[40px] max-h-[120px]"
              style={{ height: 'auto' }}
              onInput={(e) => {
                const textarea=e.target as HTMLTextAreaElement;
                textarea.style.height='auto';
                textarea.style.height=`${textarea.scrollHeight}px`;
              }}
            />
            <div className="flex justify-between items-center pt-2">
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-white">
                  <FontAwesomeIcon icon={faPaperclip} className="h-5 w-5" />
                </button>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <FontAwesomeIcon icon={faFaceSmile} className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <button 
            className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
            onClick={handleSendMessage}
            disabled={newMessage.trim()===''}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow; 