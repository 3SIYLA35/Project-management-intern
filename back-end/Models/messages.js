const express=require('express');
const mongoose=require('mongoose');
const messagesSchema=new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'conversations',
        required:true,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    content:{
        type:String,
        required:true,

    },
    read:{
        type:Boolean,
        required:true,
        default:false,
    }
},{timestamps:true});
module.exports=mongoose.model('messages',messagesSchema);