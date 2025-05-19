import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faFaceSmile, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './ChatStyles.css';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ChatWindowProps {
  selectedChat: string | null;
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat, messages, loading, sendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for the current user
  const currentUser = {
    id: 'current',
    name: 'You',
    avatar: '/img/avatar-user.jpg'
  };

  // We no longer need to load messages as they are passed as props

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage=()=>{
    if (newMessage.trim() === '') return;
    
    // Use the sendMessage function passed as prop
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress=(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedChat){
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-300">chat with your team</h3>
          <p className="mt-1 text-sm text-gray-500">Select a chat from the sidebar to start messaging.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Chat header */}
      <div className="border-b border-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/img/avatar-1.jpg" 
            alt="Avatar" 
            className="h-10 w-10 rounded-full mr-3" 
          />
          <div>
            <h2 className="text-lg font-medium text-white">James McIntyre</h2>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="text-gray-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
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
            <div className="text-xs text-center text-gray-500 my-4">Yesterday</div>
            
            {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isCurrentUser?'justify-end':'justify-start'}`}
          >
            {!message.isCurrentUser&&(
              <img 
                src={message.sender.avatar} 
                alt={message.sender.name}   
                className="h-8 w-8 rounded-full mr-2 self-end" 
              />
            )}
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.isCurrentUser ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg px-4 py-2`}>
              <p className="text-sm text-white">{message.content}</p>
              <div className={`text-xs mt-1 ${message.isCurrentUser ? 'text-blue-200' : 'text-gray-400'} text-right`}>
                {message.timestamp}
              </div>
            </div>
            {message.isCurrentUser && (
              <img 
                src={message.sender.avatar} 
                alt={message.sender.name} 
                className="h-8 w-8 rounded-full ml-2 self-end" 
              />
            )}
          </div>
        ))}
        
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
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-transparent text-white resize-none focus:outline-none min-h-[40px] max-h-[120px]"
              style={{ height:'auto'}}
              onInput={(e)=>{
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
          >
            <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow; 