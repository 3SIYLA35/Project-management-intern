const express=require('express');
const Users=require('../Models/USERS');
exports.getUser=async(email)=>{
    try{
        const User=await Users.findOne({email:email});
        if(!User){
            console.log("User not found");
            return null;
        }
        return User;
    }catch(err){
        console.error(err.message);
    }
}

const UserService={
    getProfileData:async(userID)=>{
         try{
            const user=await Users.findById(userID)
            .select('-password');
            if(!user){
                throw new Error('user not found');
            }
         }catch(err){
            console.error(err.message);
         }
    }
}
module.exports =UserService;