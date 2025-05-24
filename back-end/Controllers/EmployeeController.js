const UserService=require('../Services/User').UserService;

exports.getProfileinfo=async(req,res)=>{
    try{
        const userID=req.user.id;
        const user =await UserService.getProfileinfo(userID);
        return res.status(200).json(user);

    }catch(err){
        console.error("error on controller",err.message);
    }
}

