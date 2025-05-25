import { apiClient }from "./apiClient";
import {UserProfile} from '../components/Profile/types';
import { adaptuserProfile, addaptProfileforapi } from "../adapters/profileAdapter";
import { ApiUserProfile } from "../adapters/profileAdapter";
export const userApi={
    getProfileinfo:async()=>{
        const response=await apiClient.get<ApiUserProfile>('/employee/get-profile-info');
        console.log('data fetched from api',response);
        return adaptuserProfile(response);
    },
    updateprofileinfo:async(updatedData:Partial<UserProfile>)=>{
        const response=await apiClient.put<ApiUserProfile>('/employee/update-profile-info',
            addaptProfileforapi(updatedData)
        )
        return adaptuserProfile(response);
    }
}