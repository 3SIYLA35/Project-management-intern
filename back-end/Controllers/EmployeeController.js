const UserService=require('../Services/User');
const { parseFormData } = require('../utils/parseFormData');
const uploadbuffertocloudinary=require('../utils/uploadbuffertocloudinary');

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
        console.log('-------------before parse from data ',req.body);
        console.log('--------files',req.files?Object.keys(req.files):null);
        const updatedata=parseFormData(req.body);
        if(req.files?.coverImage?.[0]){
            // console.log('-----------------coverImage  uploaded to cloudinary ',updatedata.coverImage);
            updatedata.coverImage=await uploadbuffertocloudinary(req.files.coverImage[0].buffer,'coverImage');

        }
        if(req.files?.avatarUrl?.[0]){
            updatedata.avatarUrl=await uploadbuffertocloudinary(req.files.avatarUrl[0].buffer,'avatar');
            // console.log('-----------------avatarUrl uploaded to cloudinary ',updatedata.avatarUrl);
        }
        console.log('-----------------after parse form data and upload to cloudinary ',updatedata);
        const updatedData=await UserService.updateprofileinfo(userid,updatedata);
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


