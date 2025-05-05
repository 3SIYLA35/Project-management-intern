import React from 'react';
import AppRouter from './Routes';
import { Authprovider } from './login-registre/Auth/authContext';
import Registration from './login-registre/registration';

function App() {
  return (
    // <Authprovider>
    //   <AppRouter />
    // </Authprovider>
    <Registration/>
  );
}

export default App; 