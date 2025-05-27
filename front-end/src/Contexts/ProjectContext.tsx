import { useProject } from "../hooks/useProject";
import { createContext, useContext } from "react";

const ProjectContext=createContext<ReturnType<typeof useProject>|undefined>(undefined);

export const ProjectProvider=({children}:{children:React.ReactNode})=>{
    const project=useProject();
    return(
        <ProjectContext.Provider value={project}>
            {children}
            </ProjectContext.Provider>
    )
}

export const useProjectContext=()=>{
    const context=useContext(ProjectContext);
    if(!context){
        throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    return context;
}