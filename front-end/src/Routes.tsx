import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { Navigate } from 'react-router-dom';
import {useAuth} from './login-registre/Auth/authContext';
import { Children } from 'react';



export const Routes=({Children})=>{
    const {isAuthenticated,loading} =useAuth();
    if(loading) return <div>Loading ....</div>;
    if(!isAuthenticated) return <Navigate to={"/login"}/>
    else{
        <Navigate to={"/Dashboard"}/>
    }
    return Children;
};

export const AdminRoute=({Children})=>{
    const {isAdmin,loading} =useAuth();
    if(loading)return <div>Loading ...</div>
    if(!isAdmin)return <Navigate to={"/Dashboard"}/>
    return Children;

}

