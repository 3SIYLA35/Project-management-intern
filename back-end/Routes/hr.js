const express=require('express');
const router=express.Router();
const {check}=require('express-validator');
const invitationController=require('../Controllers/HR/invitationController');
const {authenticateUser}=require('../Middleware/Auth');

const validateInvitation=[
    check('email','valid email is required').isEmail(),
    check('firstName','firstName is required').notEmpty(),
    check('lastName','last name is required').notEmpty(),
    check('role','role is  required').isIn(['employee','manager','hr'])
];

router.post('/invite',authenticateUser,validateInvitation,invitationController.inviteEmployee);

module.exports=router;
