const express =require('express');
const mongoose=require('mongoose');
const projecctSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['in_progress','completed','cancelled'],
        default:'in_progress',
        required:true
    },
    color:{
        type:String,
        required:true
    },
    progress:{
        type:Number,
        default:0,
        required:true
    },
    completedTasks:{
        type:Number,
        default:0,
        required:true
    },
    totalTasks:{
        type:Number,
        default:0,
        required:true
    },
    daysLeft:{
        type:Number,
        required:true,
        default:0
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }],


},{timestamps:true});


module.exports=mongoose.model('projects',projecctSchema);