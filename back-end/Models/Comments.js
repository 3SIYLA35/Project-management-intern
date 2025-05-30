const express=require('express');
const mongoose=require('mongoose');

const replySchema=new mongoose.Schema({
    content:{
        type:String,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    parentReplyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'replies',
        default: null,
    },
    replyLevel:{
        type:Number,
        default:1,
    },
},{timestamps:true });

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
    replies:[replySchema],
}, {timestamps:true});

module.exports=mongoose.model('comments',commentSchema);