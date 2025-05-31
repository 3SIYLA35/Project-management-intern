import { useComment } from "../hooks/useComment";
import { createContext, useContext } from "react";


const CommentContext=createContext<ReturnType<typeof useComment>|undefined>(undefined);

export const CommentProvider=({children}:{children:React.ReactNode})=>{
   const Comment=useComment();

   return(
    <CommentContext.Provider value={Comment}>
        {children}
    </CommentContext.Provider>
   )

}

export const useCommentContext=()=>{
    const context=useContext(CommentContext);
    if(!context){
        throw new Error('useCommentContext must be used within a CommentProvider');
    }
    return context;
}
