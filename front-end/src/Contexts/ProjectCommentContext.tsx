import { useProjectComment } from "../hooks/useProjectComment";
import { createContext, useContext } from "react";

const ProjectCommentContext=createContext<ReturnType<typeof useProjectComment> | undefined>(undefined);
export const ProjectCommentProvider=({ children }:{ children:React.ReactNode })=>{
   const projectComment=useProjectComment();
   return (
    <ProjectCommentContext.Provider value={projectComment}>
        {children}
    </ProjectCommentContext.Provider>
   );
};

export const useProjectCommentContext=()=>{
    const context=useContext(ProjectCommentContext);
    if(!context){
        throw new Error('useProjectCommentContext must be used within a ProjectCommentProvider');
    }
    return context;
}; 