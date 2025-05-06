const invitationService=require('../../Services/invitationService');

const {validationResult} =require('express-validator');
exports.inviteEmployee=async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                message:'Validation errors',
                errors:errors.array()
            });
        }
        const {email,firstName,lastName,role}=req.body;
        const hrId=req.user.id;
        const result=await invitationService.createinvitation({
            email,firstName,lastName,role,hrId
        });
        return res.status(201).json({
            success:true,
            message:'employee invited successfly',
            data:result
        });
        
    }catch(err){
        console.error('Error inviting employee:', err);
        res.status(500).json({
            success:false,
            message:'error inviting employee',
            error:err.message
        });
    }
}