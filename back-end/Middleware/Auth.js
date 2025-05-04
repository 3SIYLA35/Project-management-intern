const {verifyToken} =require('../config/JWT');

exports.authenticateUser=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader||!authHeader.startsWith('Bearer')){
            return res.status(401).json({message:'Authentication required'})
        }
        console.log(`authHeader`,authHeader);
        const token=authHeader.split(' ')[1];
        const decoded=verifyToken(token);
        if(!decoded){
            return res.status(401).json({message:"invalid or expired token"});
        }
         req.user=decoded;
         next();
    }catch(err){
        console.error(err.message);
    }
}
exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({messge:"authentication required"});
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:"Access denied . You do not have  permission to preform this action"
            })
        }
        next();
    }
}