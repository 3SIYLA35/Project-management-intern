import axios from 'axios';

const API_URL='http://localhost:8000';

export const inviteEmployee=async (employeeData)=>{
  try {
    const token=localStorage.getItem('token');
    
    const response=await axios.post(`${API_URL}/hr/invite`, employeeData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    return{
      success:true,
      data:response.data
    };
  }catch(error){
    return{
      success: false,
      error: error.response?.data?.message || 'Failed to send invitation'
    };
  }
}; 