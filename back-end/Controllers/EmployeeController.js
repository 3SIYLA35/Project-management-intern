const UserService=require('../Services/User');

exports.getProfileinfo=async(req,res)=>{
    try{
        const userID=req.user.id;
        const user =await UserService.getProfileData(userID);
        // console.log(user);
        return res.status(200).json(user);;

    }catch(err){
        console.error("error on controller",err.message);
    }
}
exports.updateprofileinfo=async(req,res)=>{
    try{
        const userid=req.user.id;
        console.log(req.body);
        const updatedata={...req.body};
        // if(req.files?.coverImage?.[0]){
        //     // updatedata.coverImage=await uploadbuffertocloudinary(req.files.banner,'banner');
        // }
        // if(req.files?.avatar?.[0]){
        //     updatedata.avatar=await uploadbuffertocloudinary(req.files.avatar,'avatar');
        // }
        console.log(updatedData);
        const updatedData=await UserService.updateprofileinfo(userid,req.body);
        return res.status(200).json(updatedData);
    }catch(err){
        console.error("error on controller",err.message);
        return res.status(500).json({error:"failed to update profile"});
    }
}

exports.getallemployee=async(req,res)=>{
    try{
        const userid=req.user.id;
        if(!userid){
            return res.status(401).json({error:"unauthorized"});
        }
        const employees=await UserService.getallemployees();
        if(!employees){
            return res.status(404).json({error:"no employees found"});
        }
        return res.status(200).json(employees);
    }catch(err){
        console.error("error on controller",err.message);
        return res.status(500).json({error:"failed to get all employee"});
    }
}


