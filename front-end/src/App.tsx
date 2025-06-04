import React from 'react';
import AppRouter from './Routes';
import { Authprovider } from './login-registre/Auth/authContext';
import SocketInitializer from './components/Conversation/SocketInitializer';
import { Toaster } from "./components/ui/sonner"
import { ProfileProvider } from './Contexts/ProfileContext';
import { ChatProvider } from './Contexts/ChatContext';

function App() {
  console.log('🔄 App component rendering');
  
  return (
    <Authprovider>
      <ProfileProvider>
        <ChatProvider key="main-chat-provider">
          <SocketInitializer />
          <AppRouter />
          <Toaster />
        </ChatProvider>
      </ProfileProvider>
    </Authprovider>
    // <Registration/>
  );
}

export default App; 