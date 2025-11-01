import React from 'react';
import AppRouter from './Routes';
import { AuthProvider } from './Contexts/authContext';
import SocketInitializer from './components/Conversation/SocketInitializer';
import { Toaster } from "./components/ui/sonner"
import { ProfileProvider } from './Contexts/ProfileContext';
import { ChatProvider } from './Contexts/ChatContext';

function App() {
  console.log('🔄 App component rendering');
  
  return (
    <ProfileProvider>
     <AuthProvider>
        <ChatProvider key="main-chat-provider">
          <SocketInitializer />
          <AppRouter />
          <Toaster />
        </ChatProvider>
     </AuthProvider>
  </ProfileProvider>
    // <Registration/>
  );
}

export default App; 