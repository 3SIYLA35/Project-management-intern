import { useProfile } from "../hooks/useProfile";
import { Value } from "@radix-ui/react-select";
import React, { createContext ,useContext} from "react";

const ProfileContext=createContext<ReturnType<typeof useProfile>|undefined>(undefined);

export const ProfileProvider=({children}:{children:React.ReactNode})=>{
    const profileData=useProfile();
    return(
        <ProfileContext.Provider value={profileData}>
            {children}
        </ProfileContext.Provider>
    );

}

export const useProfileContext=()=>{
    const context=useContext(ProfileContext);
    if(!context){
        throw new Error('useprofilecontext must be used within a profileprovider');
    };
    return context;
}