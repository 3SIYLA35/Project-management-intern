import { useEffect, useRef, useState } from "react";
import { userApi } from "../api/UserApi";
import { UserProfile } from "../components/Profile/types";


export const useProfile=()=>{
    const [profile,setprofile]=useState<UserProfile|null>(null);
    const [loading,setloading]=useState(false);
    const [error,seterror]=useState<string|null>(null);
    const [employees,setemployees]=useState<UserProfile[]>([]);
    const countcallProfilehook=useRef(0);
    const hasinitialized=useRef(false);
    const fetchProfile=async()=>{
        try{
            setloading(true);
            const data=await userApi.getProfileinfo();
            setprofile(data);
            // console.log('profile from useProfile',data);

        }catch(err){
            seterror('failed to load profile');
        }finally{
            setloading(false);
        }
    }
    const updateprofile=async(updatedata:Partial<UserProfile>,
                    avatar?:File,
                    banner?:File )=>{
        try{
            setloading(true);
            const formData=new FormData();
            if(avatar){
                formData.append('avatar',avatar);
            }
            if(banner){
                formData.append('banner',banner);
            }
            const updated=await userApi.updateprofileinfo(updatedata,formData);
            setprofile(updated);
        }catch(err){
            seterror('failed to update profile');
        }finally{
            setloading(false);
        }
    }

    const fetchallemployee=async()=>{
        try{
            countcallProfilehook.current++;
            console.log('fetching employees',countcallProfilehook.current);
            setloading(true);
            const data=await userApi.getallemployee();
            setemployees(data);
            // console.log('employees fetched from hook',employees);
        }catch(err){
            seterror('failed to fetch employees');
        }finally{
            setloading(false);
        }
    }
    useEffect(()=>{
        if(!hasinitialized.current){
            // hasinitialized.current=true;
        console.log("sssssssssssss")
        fetchProfile();}
        // fetchallemployee();
    },[]);
    return {profile,loading,error,updateprofile,fetchProfile,fetchallemployee,employees};
}