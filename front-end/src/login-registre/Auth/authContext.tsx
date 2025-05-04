import {createContext,useState,useEffect,useContext, Children} from 'react';
const AuthContext=createContext();

export const Authprovider=({Children})=>{
    const [user,setuser]=useState(null);
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
    const login=async (email,password)=>{
        try{
            const response=await fetch("http://localhost:8000/auth/login",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password});
            });
        if(!response.ok) throw new Error("Login failed");
        const data=await response.json()
        settoken(data.token);
        setuser(data.user);
        localStorage.setItem('token',data.toke);

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

    const hasrole=(role)=>{
        return user && user.role===role;
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            loading,
            loading,
            isAuthneticated:!!user,
            isAdmin:hasrole('admin'),
            isMember:hasrole('member')
        }}>

            {Children}
        </AuthContext.Provider>
    )
}

export const usAuth=()=>useContext(AuthContext);
