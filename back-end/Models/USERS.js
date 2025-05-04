const express=require('express');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:false
    },
    FirstName:{
        type:String,
        required:false
    },
    LastName:{
        type:String,
        required:false
    },
    Role:{
        type:String,
        enum:["admin","member"],
        default:"member"
    },
    avatarUrl:{
        type:String,
        required:false
    },
    lastLogin:{
        type:Date,

    }
}, {timestamps:true});
module.exports=mongoose.model('Users',UserSchema);