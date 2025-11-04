import {createContext,useState,useEffect,useContext, Children} from 'react';
import { UserProfile } from '../../components/Profile/types';
import { useProfileContext } from '../../Contexts/ProfileContext';

  
export const useAuth=()=>{
    const [user,setuser]=useState<UserProfile>({
        id:'',
        name:'',
        email:'',
        avatar:'',
        role:'',
        department:'',
        joinDate:'',
        skills:[]
    });
    
    const [token,settoken]=useState(localStorage.getItem('token'));
    const [loading,setLoading]=useState(true);
    const [isAuthenticated,setisAuthenticated]=useState(false);
    const profilecontext=useProfileContext();

    const checkAuth=async()=>{
        if(token){
            try{
                const response=await fetch("http://localhost:8000/auth/verify",{
                    headers:{Authorization:`Bearer ${token}`}
                });
                if(response.ok){
                    const userdata=await response.json();
                    setuser(profilecontext.profile as UserProfile);
                    setisAuthenticated(true);
                }else{
                    setisAuthenticated(false);
                    localStorage.removeItem('token');
                    settoken(null);
                }
            }catch(error){
                setisAuthenticated(false);
                console.log('auth error:',error );
            }
        }
        setLoading(false);
    };
    useEffect(()=>{

        checkAuth();
    },[token]);


    //login fct
    const login=async (email:string,password:string)=>{
        try{
            const response=await fetch("http://localhost:8000/auth/login",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password})
            });
        if(!response.ok) {
            setisAuthenticated(false);
            throw new Error("Login failed");}
        const data=await response.json()
        settoken(data.token);
        localStorage.setItem('token',data.token);
        setuser(profilecontext.profile as UserProfile);
        setisAuthenticated(true);

        return true;
        
    
        }catch(error){
            setisAuthenticated(false);
            console.log("Login error ",error);
            return false;
        }
    }

    const logout=()=>{
        setisAuthenticated(false);
        localStorage.removeItem('token');
        settoken(null);
        setuser({
            id:'',
            name:'',
            email:'',
            avatar:'',
            role:'',
            department:'',
            joinDate:'',
            skills:[]
        });
    }

    const hasrole=(roles:String[])=>{
        return roles.map((role)=>{
            return user && user?.role===role;
        });
    }

    return{
        user,
        token,
        loading,
        login,
        logout,
        isAdmin:hasrole(['hr','admin']),
        isAuthenticated

    }
}

