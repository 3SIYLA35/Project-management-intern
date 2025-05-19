import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  typing?: boolean;
}

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

interface Chat {
  id: string;
  participants: User[];
  lastMessage: {
    text: string;
    time: string;
    unread?: boolean;
  };
  hasNewMessages?: boolean;
  newMessageCount?: number;
}

// In a real app, this would be fetched from an API
const mockChats: Chat[] = [
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
];

// Mock messages for a chat
const getMockMessages = (chatId: string): Message[] => {
  return [
    {
      id: '1',
      sender: {
        id: 'jm',
        name: 'James McIntyre',
        avatar: '/img/avatar-1.jpg'
      },
      content: "That's why we created the challenge, so we can assess skills under a time constraint",
      timestamp: '11:24 AM',
      isCurrentUser: false
    },
    {
      id: '2',
      sender: {
        id: 'current',
        name: 'You',
        avatar: '/img/avatar-user.jpg'
      },
      content: "That's why we created the challenge, so we can assess skills under a time constraint",
      timestamp: '11:28 AM',
      isCurrentUser: true
    },
    {
      id: '3',
      sender: {
        id: 'jm',
        name: 'James McIntyre',
        avatar: '/img/avatar-1.jpg'
      },
      content: "That's why we created the challenge, so we can assess skills under a time constraint. That's why we created the challenge, so we can assess skills under a time constraint",
      timestamp: '11:30 AM',
      isCurrentUser: false
    },
    {
      id: '4',
      sender: {
        id: 'current',
        name: 'You',
        avatar: '/img/avatar-user.jpg'
      },
      content: "That's why we created the challenge, so we can assess skills under a time constraint",
      timestamp: '11:32 AM',
      isCurrentUser: true
    }
  ];
};

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Load chats
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setChats(mockChats);
      setLoading(false);
    }, 500);
  }, []);

  // Load messages when a chat is selected
  useEffect(() => {
    if (selectedChatId) {
      // Simulate API call
      setLoading(true);
      setTimeout(() => {
        setMessages(getMockMessages(selectedChatId));
        setLoading(false);
        
        // Mark messages as read
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === selectedChatId 
              ? { ...chat, hasNewMessages: false, newMessageCount: 0 } 
              : chat
          )
        );
      }, 300);
    }
  }, [selectedChatId]);

  // Send a message
  const sendMessage = (content: string) => {
    if (!selectedChatId || !content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: {
        id: 'current',
        name: 'You',
        avatar: '/img/avatar-user.jpg'
      },
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };

    setMessages(prev => [...prev, newMessage]);

    // Update last message in chat list
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChatId 
          ? { 
              ...chat, 
              lastMessage: { 
                text: content, 
                time: newMessage.timestamp
              } 
            } 
          : chat
      )
    );

    // Simulate a response (in a real app, this would come from the server)
    setTimeout(() => {
      // Show typing indicator
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChatId 
            ? { 
                ...chat, 
                participants: chat.participants.map(p => ({ ...p, typing: true }))
              } 
            : chat
        )
      );

      // After "typing", send the response
      setTimeout(() => {
        const responseMessage: Message = {
          id: Date.now().toString(),
          sender: {
            id: chats.find(c => c.id === selectedChatId)?.participants[0].id || '',
            name: chats.find(c => c.id === selectedChatId)?.participants[0].name || '',
            avatar: chats.find(c => c.id === selectedChatId)?.participants[0].avatar || ''
          },
          content: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: false
        };

        setMessages(prev => [...prev, responseMessage]);
        
        // Update last message and remove typing indicator
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === selectedChatId 
              ? { 
                  ...chat, 
                  lastMessage: { 
                    text: responseMessage.content, 
                    time: responseMessage.timestamp
                  },
                  participants: chat.participants.map(p => ({ ...p, typing: false }))
                } 
              : chat
          )
        );
      }, 2000);
    }, 1000);
  };

  return {
    chats,
    messages,
    loading,
    selectedChatId,
    setSelectedChatId,
    sendMessage
  };
};

export type { Chat, Message, User }; 