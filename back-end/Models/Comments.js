const express=require('express');
const mongoose=require('mongoose');
const replySchema=require('./reply');


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
        required: true,
    },
    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'replies',
        required:false,
    }],
}, {timestamps:true});

module.exports=mongoose.model('comments',commentSchema);