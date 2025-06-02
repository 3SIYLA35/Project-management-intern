import React from 'react';
import AppRouter from './Routes';
import { Authprovider } from './login-registre/Auth/authContext';
import SocketInitializer from './components/Conversation/SocketInitializer';
import { Toaster } from "./components/ui/sonner"


function App() {
  return (
    <Authprovider>
      <AppRouter />
      <Toaster />
    </Authprovider>
    // <Registration/>
  );
}

export default App; 