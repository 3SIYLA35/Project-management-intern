const projectmodel=require('../Models/projects');


const ProjectService={
    createproject:async(userid,projectdata)=>{
        const project=await projectmodel.create({
            ...projectdata,
            owner:userid,
        });
        return project;
    },
    getallprojects:async()=>{
        try{
            console.log("fetching all projects");
            const projects=await projectmodel.find();
            return projects;
        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    },
    updateproject:async(projectid,updatedata)=>{
        try{
            const project=await projectmodel.findByIdAndUpdate(
                projectid,
                {$set:updatedata},
                {new:true});
            return project;
        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    }
}

module.exports=ProjectService;