import React from 'react';
import AppRouter from './Routes';
import { Authprovider } from './login-registre/Auth/authContext';

function App() {
  return (
    <Authprovider>
      <AppRouter />
    </Authprovider>
  );
}

export default App; 