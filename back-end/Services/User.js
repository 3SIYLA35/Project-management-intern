const express=require('express');
const Users=require('../Models/USERS');
const cloudinary=require('../utils/cloudinary');


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
            
            const user=await Users.findByIdAndUpdate(userid,
                   {$set:updatedData} ,
                {new:true});
            if(!user){
                throw new Error('user not found');
            }
            return user;
        }catch(err){
            console.error(err.message);
            const  error=new Error('failed save data',err.message);
            error.status=500;
            error.name='userServiceUpdate';
            error.message='failed save data';
            throw error;
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