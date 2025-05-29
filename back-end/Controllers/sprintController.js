const sprintService=require('../Services/sprintService.cjs');

exports.getSprints=async(req,res)=>{
    try{
        console.log('fetching sprints');
        const userid=req.user.id;
        if(!userid){
            return res.status(401).json({
                message:'Unauthorized',
            })
        }
        const projectId=req.params.projectId;
        if(!projectId){
            return res.status(400).json({
                message:'project ID is required',
            })
        }
        const sprints=await sprintService.getSprints(projectId);
        if(!sprints){
            return res.status(404).json({
                message:'No sprints found',
            })
        }
        res.status(200).json(sprints);

    }catch(error){
        console.error('Error fetching sprints',error);
        res.status(500).json({
            message:'Error fetching sprints',
        })
    }
}