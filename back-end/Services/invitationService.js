const crypto=require('crypto');
const InvitationModel=require('../Models/invitation');
const emailService=require('./emailService');
const jwt=require('jsonwebtoken');
require('dotenv').config();



class invitationService{
 static async createinvitation({email,firstName,lastName,role,hrId}){
    try{
        const existinginvitation=await InvitationModel.findOne({email});
        if(existinginvitation){
            existinginvitation.firstName=firstName;
            existinginvitation.lastName=lastName;
            existinginvitation.role=role;
            existinginvitation.hrId=hrId;
            await existinginvitation.save();
            await this.sendinvitationEmail(existinginvitation);
            return existinginvitation;
        }
        const invitation=new InvitationModel({
            email,firstName,lastName,role,hrId,
            token:this.generateToken({email,firstName,lastName,role,hrId}),
            status:'pending',
            expiresAt:this.getexipirationDate()
        })
        await invitation.save();
        await this.sendinvitationEmail(invitation);;;
        return invitation;
        
    }catch(err){
        console.error('Error creating invitation:',err);
        throw err;
    }
}

    static generateToken(user){
        // return crypto.randomBytes(32).toString('hex');
        const token=jwt.sign({
            id:user.id,firstName:user.firstName,lastName:user.lastName,email:user.email,role:user.role
         },
         process.env.JWT_SECRET,
         {expiresIn:'7d'}
         );
         console.log('token',token);
         return token;
    }
    static getexipirationDate(){
        const date =new Date();
        date.setDate(date.getDate()+7);
        return date;
    }
    static async sendinvitationEmail(invitation){
        const registrationlink=`http://localhost:3000/register?token=${invitation.token}`;

        const emaildata={
            to:invitation.email,
            subject:'INvitation to join the platform',
            template:'email',
            context:{
                firstName:invitation.firstName,
                lastName:invitation.lastName,
                role:invitation.role,
                registrationlink,
                expiryDays:7
            }
        }
        return emailService.sendemail(emaildata);;;;

    }

}
module.exports=invitationService;
