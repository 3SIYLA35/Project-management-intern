import axios from 'axios';


const API_url='http://localhost:8000';

export const registerUser=async(userData)=>{
    const token=localStorage.getItem('token');
    try{
        const response=await axios.post(`${API_url}/employee/save-password`,userData,

            {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        )
        if(response.status!=200){
            return{
                success:false,
                message:'Failed to save password'
            }
        }
        return{
            success:true,
            message:'password saved successfully'
        }
    }catch(error){
        console.error('error while  save password user',error);
        throw error;
    }
}