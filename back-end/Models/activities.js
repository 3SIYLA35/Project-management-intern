const express=require('express');
const mongoose=require('mongoose');
const activitySchema=new mongoose.Schema({
    type:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    entityType:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    }
},{timestamps:true})
module.exports=mongoose.model('activities',activitySchema);