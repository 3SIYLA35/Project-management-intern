const express=require('express');
const Users=require('../Models/USERS');

const UserService={
    getProfileData:async(userID)=>{
        try{
            const user=await Users.findById(userID)
            .select('-password');
            if(!user){
                throw new Error('user not found');
            }
            return user;
        }catch(err){
            console.error(err.message);
        }
    },
    getUser:async(email)=>{
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
    },
    updateprofileinfo:async(userid,updatedData)=>{
        try{
            console.log('updatedData',updatedData);
            const user=await Users.findByIdAndUpdate(userid,
                   {$set:updatedData} ,
                {new:true});
            if(!user){
                throw new Error('user not found');
            }
            return user;
        }catch(err){
            console.error(err.message);
        }
    },
    getallemployees:async()=>{
        try{
            const employees=await Users.find();
            return employees;
        }catch(err){
            console.log(err.message);
            return null
        }
    }

}
module.exports =UserService;