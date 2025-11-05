const cloudinary=require('../utils/cloudinary');
 module.exports=function uploadbuffertocloudinary(buffer,folder){
    return new Promise((resolve,reject)=>{
        const stream=cloudinary.uploader.upload_stream(
            {folder,resource_type:'image'},
            (err,result)=>{
                if(err)return reject(err);
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    })
 }