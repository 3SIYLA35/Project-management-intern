const express=require('express');
const mongoose=require('mongoose');
const sprinSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'projects',
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{           
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:['active','completed','cancelled'],
        default:'active',
    },
    goals:{
        type:String,
        required:true,
    },
},{timestamps:true})
module.exports=mongoose.model('sprints',sprinSchema);