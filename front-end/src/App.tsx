import React from 'react';
import AppRouter from './Routes';
import { Authprovider } from './login-registre/Auth/authContext';
import SocketInitializer from './components/Conversation/SocketInitializer';
import { Toaster } from "./components/ui/sonner"
import { ProfileProvider } from './Contexts/ProfileContext';

function App() {
  return (
    <Authprovider>
      <ProfileProvider>
        <SocketInitializer />
        <AppRouter />
        <Toaster />
      </ProfileProvider>
      
      
    </Authprovider>
    // <Registration/>
  );
}

export default App; 