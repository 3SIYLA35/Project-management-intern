import React, { Children, createContext, useContext } from 'react';
import {Task} from '../components/Profile/types';
import { useTask } from "../hooks/useTask";



const TaskContext=createContext<ReturnType<typeof useTask> | undefined>(undefined);

export const TaskProvider=({children}:{children:React.ReactNode})=>{
    const task=useTask();

    return(
        <TaskContext.Provider value={task}>
            {children}
        </TaskContext.Provider>
    )
}


export const useTaskContext=()=>{
    const context=useContext(TaskContext);
    if(!context){
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}
