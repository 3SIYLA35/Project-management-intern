import  { createContext, useContext, useEffect } from 'react';

import { useChat } from '../hooks/useChat';
const PROVIDER_ID=Math.random().toString(36).substring(2, 9);

const ChatContext=createContext<ReturnType<typeof useChat>|undefined>(undefined);

export const ChatProvider:React.FC<{children:React.ReactNode; key?: string}>=({children,key})=>{
    const chatState=useChat();
    useEffect(()=>{
      console.log(`chatprovider ID: ${PROVIDER_ID} active conversation:`,chatState.activeConversation?.id);
    },[chatState.activeConversation]);
    useEffect(()=>{
      console.log(`chatprovider ID: ${PROVIDER_ID} messages count:`,chatState.messages.length);
    },[chatState.messages]);
    
    return(
      <ChatContext.Provider value={chatState}>
        {children}
      </ChatContext.Provider>
    );
  };

export const useChatContext=()=>{
    const context=useContext(ChatContext);
    if(!context){
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}

export default ChatContext; 