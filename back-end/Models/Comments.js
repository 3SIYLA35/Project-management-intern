const express=require('express');
const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tasks',
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    replies:[{
        id:{type:String,
        required:true,},
        content:{
            type:String,
            required:true,
        },
        timestamps:true,
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:true,
        },
    }],
}, {timestamps:true});

module.exports=mongoose.model('comments',commentSchema);