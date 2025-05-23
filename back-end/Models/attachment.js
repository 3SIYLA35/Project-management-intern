const express=require('express');
const mongoose=require('mongoose');
const attachmentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    type:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,

    },
    date:{
        type:String,
        required:true,
    },
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tasks',
        required:true,
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },

},{timestamps:true})

module.exports=mongoose.model('attachments',attachmentSchema);