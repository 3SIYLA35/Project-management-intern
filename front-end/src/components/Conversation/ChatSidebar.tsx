import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import './ChatStyles.css';
import TypingIndicator from './TypingIndicator';

interface Chat {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    typing?: boolean;
  }[];
  lastMessage: {
    text: string;
    time: string;
    unread?: boolean;
  };
  hasNewMessages?: boolean;
  newMessageCount?: number;
}

interface ChatSidebarProps{
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  chats: Chat[];
  loading: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ selectedChat, onSelectChat, chats, loading }) => {
  // If no chats are provided, use mock data
  const [localChats, setLocalChats] = useState<Chat[]>([
    {
      id: '1',
      participants: [
        { id: 'jm', name: 'James McIntyre', avatar: '/img/avatar-1.jpg', isOnline: true }
      ],
      lastMessage: {
        text: 'That\'s why we created the challenge, so we can assess skills under a time constraint',
        time: '11:24 AM'
      }
    },
    {
      id: '2',
      participants: [
        { id: 'mf', name: 'Maria Fernanda', avatar: '/img/avatar-2.jpg', isOnline: true, typing: true }
      ],
      lastMessage: {
        text: 'Ok, let me check this out for a moment, thank you for your patience',
        time: '10:52 AM'
      }
    },
    {
      id: '3',
      participants: [
        { id: 'lk', name: 'Liam K.', avatar: '/img/avatar-3.jpg', isOnline: false },
        { id: 'or', name: 'Olivia Ruiz', avatar: '/img/avatar-4.jpg', isOnline: false }
      ],
      lastMessage: {
        text: 'Trying to connect my account to a new device and could use a hand getting everything synced properly',
        time: '10:04 AM'
      },
      hasNewMessages: true,
      newMessageCount: 1
    },
    {
      id: '4',
      participants: [
        { id: 'st', name: 'Sophia T.', avatar: '/img/avatar-5.jpg', isOnline: false },
        { id: 'mj', name: 'Mike James', avatar: '/img/avatar-1.jpg', isOnline: false }
      ],
      lastMessage: {
        text: 'Just started using eplan and figured you might help me through the first step',
        time: '10:04 AM'
      },
      hasNewMessages: true,
      newMessageCount: 2
    },
    {
      id: '5',
      participants: [
        { id: 'eb', name: 'Emma B.', avatar: '/img/avatar-2.jpg', isOnline: false },
        { id: 'cs', name: 'Carlos Sean', avatar: '/img/avatar-3.jpg', isOnline: false }
      ],
      lastMessage: {
        text: 'Everything was working great until today—now the screen won\'t load properly and I\'d love to get it fixed',
        time: '10:01 AM'
      },
      hasNewMessages: true,
      newMessageCount: 1
    },
    {
      id: '6',
      participants: [
        { id: 'nr', name: 'Noah R.', avatar: '/img/avatar-4.jpg', isOnline: false },
        { id: 'cl', name: 'Chloe Lin', avatar: '/img/avatar-5.jpg', isOnline: false }
      ],
      lastMessage: {
        text: 'Looking to update my settings but not sure where to find the right option in the app',
        time: '09:52 AM'
      }
    },
    {
      id: '7',
      participants: [
        { id: 'lv', name: 'Lucas V.', avatar: '/img/avatar-1.jpg', isOnline: false },
        { id: 'im', name: 'Isabella M.', avatar: '/img/avatar-2.jpg', isOnline: false }
      ],
      lastMessage: {
        text: 'I noticed something odd in the dashboard—could be a bug or maybe I\'m missing something',
        time: '09:52 AM'
      }
    },
    {
      id: '8',
      participants: [
        { id: 'as', name: 'Ava S.', avatar: '/img/avatar-3.jpg', isOnline: false },
        { id: 'mr', name: 'Michael Rivera', avatar: '/img/avatar-4.jpg', isOnline: false }
      ],
      lastMessage: {
        text: 'Loving this platform so far, just need help sorting out one small technical thing',
        time: '09:05 AM'
      }
    },
    {
      id: '9',
      participants: [
        { id: 'ew', name: 'Ethan W.', avatar: '/img/avatar-5.jpg', isOnline: false },
        { id: 'gy', name: 'Grace Yamamoto', avatar: '/img/avatar-1.jpg', isOnline: false }
      ],
      lastMessage: {
        text: 'Just upgraded my account and want to make sure everything\'s set up correctly on your end',
        time: '07:32 AM'
      }
    },
    {
      id: '10',
      participants: [
        { id: 'mh', name: 'Mason H.', avatar: '/img/avatar-2.jpg', isOnline: false },
        { id: 'zl', name: 'Zoe Laurent', avatar: '/img/avatar-3.jpg', isOnline: false }
      ],
      lastMessage: {
        text: 'I think I created the wrong thing and now a deadline is approaching!',
        time: '06:52 AM'
      }
    }
  ]);

  // Use provided chats or fall back to local mock data
  const displayChats = chats.length > 0 ? chats : localChats;
  
  // Group messages by date
  const yesterday = displayChats.slice(0, 2);
  const newMessages = displayChats.slice(2, 5);
  const previous = displayChats.slice(5);

  // State to track if the component is fully mounted
  const [mounted, setMounted] = useState(false);
  
  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // If loading and not mounted yet, return a loading indicator
  if (loading && !mounted) {
    return (
      <div className="w-80 bg-gray-850 border-r border-gray-800 flex items-center justify-center">
        <div className="text-gray-400">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-850 border-r border-gray-800 overflow-y-auto hide-scrollbar">
      {/* Header with archives */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h2 className="text-lg font-semibold flex items-center">
         AppBase Chats
          <span className="ml-2 bg-gray-700 text-xs rounded-full px-2 py-0.5">3</span>
        </h2>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </button>
      </div>

      {/* Search bar */}
      <div className="p-4 flex items-center">
        <div className="relative w-[85%]">
          <input 
            type="text" 
            placeholder="Find a conversation"
            className="w-full bg-gray-800 text-gray-200 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <svg className="w-5 h-5 text-gray-500 absolute  left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

      {/* Conversation Filter */}
      
        <button className="flex items-center justify-center  pl-4">
          <svg className="w-5 h-5 hover:text-gray-200 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      
      </div>


      {/* Chat list */}
      <div>
        {/* Yesterday's conversations */}
        {yesterday.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-medium text-gray-500">Yesterday</div>
            {yesterday.map(chat=>(
              <div 
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-800 ${selectedChat === chat.id ? 'bg-gray-800' : ''}`}
              >
                <div className="flex">
                  <div className="relative">
                    <img 
                      src={chat.participants[0].avatar} 
                      alt={chat.participants[0].name} 
                      className="w-10 h-10 rounded-full mr-4" 
                    />
                    {chat.participants[0].isOnline && (
                      <div className="absolute bottom-0 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-850"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-white truncate">
                        {chat.participants.map(p => p.name).join(' & ')}
                      </h3>
                      <span className="text-xs text-gray-500">{chat.lastMessage.time}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      {chat.participants[0].typing ? (
                        <p className="text-xs text-gray-400 truncate">
                          <TypingIndicator />
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 truncate">{chat.lastMessage.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* New Messages */}
        {newMessages.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-medium text-gray-500">New Messages ({newMessages.length})</div>
            {newMessages.map(chat => (
              <div 
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-800 ${selectedChat === chat.id ? 'bg-gray-800' : ''}`}
              >
                <div className="flex">
                  <div className="relative">
                    <img 
                      src={chat.participants[0].avatar} 
                      alt={chat.participants[0].name} 
                      className="w-10 h-10 rounded-full mr-4" 
                    />
                    {chat.participants[0].isOnline && (
                      <div className="absolute bottom-0 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-850"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-white truncate">
                        {chat.participants.map(p => p.name).join(' & ')}
                      </h3>
                      <span className="text-xs text-gray-500">{chat.lastMessage.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400 truncate">{chat.lastMessage.text}</p>
                      {chat.hasNewMessages && (
                        <div className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.newMessageCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        
        {/* Previous conversations */}
        {previous.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-medium text-gray-500">Previous</div>
            {previous.map(chat => (
              <div 
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-800 ${selectedChat === chat.id ? 'bg-gray-800' : ''}`}
              >
                <div className="flex">
                  <div className="relative">
                    <img 
                      src={chat.participants[0].avatar} 
                      alt={chat.participants[0].name} 
                      className="w-10 h-10 rounded-full mr-4" 
                    />
                    {chat.participants[0].isOnline && (
                      <div className="absolute bottom-0 right-4 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-850"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-white truncate">
                        {chat.participants.map(p => p.name).join(' & ')}
                      </h3>
                      <span className="text-xs text-gray-500">{chat.lastMessage.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400 truncate">{chat.lastMessage.text}</p>
                      {chat.hasNewMessages && (
                        <div className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.newMessageCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar; 