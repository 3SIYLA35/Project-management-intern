import React from 'react';
import AppRouter from './Routes';
import { Authprovider } from './login-registre/Auth/authContext';
import Registration from './login-registre/registration';
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