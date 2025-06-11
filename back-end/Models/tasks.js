const express=require('express')
const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','in_progress','completed','cancelled'],
        default:'pending',
        required:false
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium',
        required:false
    },
    startDate:{
        type:Date,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'projects',
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    sprintId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sprints',
        required:false
    },
}, {timestamps:true});

module.exports=mongoose.model('tasks',taskSchema)