const UserService=require('../Services/User');

exports.getProfileinfo=async(req,res)=>{
    try{
        const userID=req.user.id;
        const user =await UserService.getProfileData(userID);
        console.log(user);
        return res.status(200).json(user);;

    }catch(err){
        console.error("error on controller",err.message);
    }
}
exports.updateprofileinfo=async(req,res)=>{
    try{
        const userid=req.user.id;
        const updatedData=await UserService.updateprofileinfo(userid,req.body);
        return res.status(200).json(updatedData);
    }catch(err){
        console.error("error on controller",err.message);
        return res.status(500).json({error:"failed to update profile"});
    }
}

