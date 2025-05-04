const jwt=require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET=process.env.JWT_SECRET;
const JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN;

exports.generatetoken=(user)=>{
    return jwt.sign(
        {
            id:user._id,
            email:user.email,
            role:user.role,
            avatar:user.avatarUrl,
            firstName:user.FirstName,
            LastName:user.LastName,
        },
                JWT_SECRET,
                {
                    expiresIn:JWT_EXPIRES_IN
                }
    );
};

exports.verifyToken=(token)=>{
    try{
        return jwt.verify(token,JWT_SECRET);
    }catch(err){
        return null;
    }
}