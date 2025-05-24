import { apiClient }from "./apiClient";
import {UserProfile} from '../components/Profile/types';
export const userApi={
    getProfileinfo:()=>{
        return apiClient.get<UserProfile>('/employee/get-profile-info');
    }
}