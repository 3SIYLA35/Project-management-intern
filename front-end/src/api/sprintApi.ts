import axios from "axios";


export const sprintApi={
    getSprints:async(projectId:string)=>{
        try{
            const response=await axios.get('/sprint/get-sprints');
            if(response.status===200){
                return response.data;
            }
            console.log('sprints fetched',response.data);
            return null;
        }catch(error){
            console.error('Error fetching sprints:',error);
            throw error;
        }
    },
    

}