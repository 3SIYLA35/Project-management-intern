import { useEffect, useState } from "react";
import { userApi } from "../api/UserApi";
import { UserProfile } from "../components/Profile/types";


export const useProfile=()=>{
    const [profile,setprofile]=useState<UserProfile|null>(null);
    const [loading,setloading]=useState(false);
    const [error,seterror]=useState<string|null>(null);
    const fetchProfile=async()=>{
        try{
            setloading(true);
            const data=await userApi.getProfileinfo();
            console.log('data fetched from hoook ',data);
            setprofile(data);

        }catch(err){
            seterror('failed to load profile');
        }finally{
            setloading(false);
        }
    }
    const updateprofile=async(updatedata:Partial<UserProfile>)=>{
        try{
            setloading(true);
            const updated=await userApi.updateprofileinfo(updatedata);
            setprofile(updated);
        }catch(err){
            seterror('failed to update profile');
        }finally{
            setloading(false);
        }
    }
    useEffect(()=>{
        fetchProfile();
        console.log('profile fetched',profile);
    },[]);
    return {profile,loading,error,updateprofile,fetchProfile};
}