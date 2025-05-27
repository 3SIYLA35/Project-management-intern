const projectService=require('../Services/projectService');

exports.createProject=async(req,res)=>{
    try{
        console.log("project controller called");
        const userId=req.user.id;
        const projecctdata=req.body;
        console.log('project data in controller',projecctdata);
        const project=await projectService.createproject(userId,projecctdata);
        if(!project){
            return res.status(400).json({message:"failed to create project"});
        }
        return res.status(201).json(project);
    }catch(err){
        console.error("error on controller",err.message);
        return res.status(500).json({message:"error on controller"});;
    }
}

exports.getallprojects=async(req,res)=>{
    try{
        console.log("getallprojects controller called");
        const userId=req.user.id;
        if(!userId){
            return res.status(401).json({message:"unauthorized"});
        }
        const projects=await projectService.getallprojects();
        if(!projects){
            return res.status(404).json({message:"no projects found"});
        }
        return res.status(200).json(projects);
    }catch(err){
        console.error("error on controller",err.message);
        return res.status(500).json({message:"error on controller"});;
    }
}