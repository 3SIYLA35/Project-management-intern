import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Registration from './login-registre/registration';
import Login from './login-registre/login';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Login></Login>
    {/* <Registration /> */}
    {/* <div className="bg-red-500 text-white p-4 m-4 text-2xl"> */}
  {/* TAILWIND TEST
</div> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
