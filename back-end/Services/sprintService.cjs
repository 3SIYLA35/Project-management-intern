const sprintmodel=require('../Models/sprint.js');

 const sprintService={
    getSprints:async(projectId)=>{
        try{
            const sprints=await sprintmodel.find({projectId:projectId});
            return sprints;

        }catch(error){
            console.error('Error fetching sprints',error);
            throw error;
        }
    }
}
module.exports=sprintService;