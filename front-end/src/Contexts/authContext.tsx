import { useAuth } from "../hooks/Auth/useAuth";
import { Children, createContext, useContext } from "react";

const AuthContext=createContext<ReturnType<typeof useAuth>|undefined>(undefined);

export const AuthProvider:React.FC<{children:React.ReactNode;key?:string}>=({children,key})=>{
    const authState=useAuth();
    return(
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext=()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
}
export default AuthContext;