import { apiClient }from "./apiClient";
import {UserProfile} from '../components/Profile/types';
import { adaptuserProfile, addaptProfileforapi } from "../adapters/profileAdapter";
import { ApiUserProfile } from "../adapters/profileAdapter";
export const userApi={
    getProfileinfo:async()=>{
        const response=await apiClient.get<ApiUserProfile>('/employee/get-profile-info');
        // console.log('response profile',response);
        return adaptuserProfile(response);
    },
    updateprofileinfo:async(updatedData:Partial<UserProfile>,formData:FormData)=>{
        const formatedData=addaptProfileforapi(updatedData);
        
        Object.keys(formatedData).forEach(key=>{
            const value=formatedData[key as keyof typeof formatedData];
            if(value!==undefined && value!==null){
                if(Array.isArray(value)){
                    formData.append(key,JSON.stringify(value))
                }
                else if(typeof value==='object'){
                    formData.append(key,JSON.stringify(value))
                }
                else{
                    formData.append(key,String(value))
                }
            }
        })
        const response=await apiClient.put<ApiUserProfile>('/employee/update-profile-info',
            formData
        )
        return adaptuserProfile(response);
    },
    getallemployee:async()=>{
        const response=await apiClient.get<ApiUserProfile[]>('/employee/get-all-employees');
        // console.log('users fetched from api',response);
        const transformedresponse=  response.map(employee=>adaptuserProfile(employee));
        return transformedresponse;
    }
}