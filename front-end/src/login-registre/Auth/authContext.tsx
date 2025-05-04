import {createContext,useState,useEffect,useContext, Children} from 'react';

interface AuthContextType {
    user: any;
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isMember: boolean;
}
interface User{
    role:'admin'|'member';
}
const AuthContext=createContext<AuthContextType>({
    user: null,
    token: null,
    login: async () => false,
    logout: () => {},
    loading: true,
    isAuthenticated: false,
    isAdmin: false,
    isMember: false
  });


  interface AuthproviderProps{
    children:React.ReactNode;
  }
  
export const Authprovider=({children}:AuthproviderProps)=>{
    const [user,setuser]=useState<User|null>(null);
    const [token,settoken]=useState(localStorage.getItem('token'));
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const checkAuth=async ()=>{
            if(token){
                try{
                    const response=await fetch("http://localhost:8000/auth/verify",{
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    if(response.ok){
                        const userdata=await response.json();
                        setuser(userdata);
                    }else{
                        localStorage.removeItem('token');
                        settoken(null);
                    }
                }catch(error){
                    console.log('auth error:',error );
                }
            }
            setLoading(false);
        };

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
        if(!response.ok) throw new Error("Login failed");
        const data=await response.json()
        settoken(data.token);
        setuser(data.user);
        localStorage.setItem('token',data.token);

        return true;
        
    
        }catch(error){
            console.log("Login error ",error);
            return false;
        }
    }

    const logout=()=>{
        localStorage.removeItem('token');
        settoken(null);
        setuser(null);
    }

    const hasrole=(role:User['role'])=>{
        return user && user?.role===role;
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            loading,
            isAuthenticated:!!user,
            isAdmin:!hasrole('admin'),
            isMember:!hasrole('member')
        }}>

            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext);
