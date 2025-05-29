import { useSprint } from "../hooks/useSprint";
import { createContext, useContext } from "react";


const SprintContext=createContext<ReturnType<typeof useSprint>|undefined>(undefined);

const SprintProvider=({children}:{children:React.ReactNode})=>{
    const sprint=useSprint();
    return(
        <SprintContext.Provider value={sprint}>
            {children}
        </SprintContext.Provider>
    )
}

const useSprintContext=()=>{
    const context=useContext(SprintContext);
    if(!context){
        throw new Error('useSprintContext must be used within a SprintProvider');
    }
    return context;
}

export {SprintProvider,useSprintContext};