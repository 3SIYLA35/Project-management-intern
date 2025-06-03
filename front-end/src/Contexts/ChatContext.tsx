import React, { createContext, useContext } from 'react';

import { useChat } from '../hooks/useChat';

const ChatContext = createContext<ReturnType<typeof useChat> | undefined>(undefined);
export const ChatProvider:React.FC<{children:React.ReactNode}>=({children})=>{
    const chatState=useChat();
    
    return (
      <ChatContext.Provider value={chatState}>
        {children}
      </ChatContext.Provider>
    );
  };

export const useChatContext=()=>{
    const conetxt=useContext(ChatContext);
    if(!conetxt){
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return conetxt;
}

export default ChatContext; 