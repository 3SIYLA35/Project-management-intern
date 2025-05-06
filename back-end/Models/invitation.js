const express=require('express');
const mongoose=require('mongoose');

const invitationSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,

    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['hr','employee','manager']
    },
    token:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','expired'],
        default:'pending',
    },
    hrId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    expiresAt:{
        type:Date,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports=mongoose.model('Invitations',invitationSchema)