const express=require('express');
const mongoose=require('mongoose');
const conversationSchema=new mongoose.Schema({
     participants:[{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:true,
        },
        isOnline:{
            type:Boolean,
            required:true,
        }
     }]
},{timestamps:true})
module.exports=mongoose.model('conversations',conversationSchema);