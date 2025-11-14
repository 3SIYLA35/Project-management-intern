const multer=require('multer');
const upload=multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:5*1024*1024},
    fileFilter:(req,file,cb)=>{
        const allowedTypes=['image/jpeg','image/png','image/webp'];
        const isok=allowedTypes.includes(file.mimetype);
        console.log('file :',{field:file.fieldname,name:file.originalname,mimetype:file.mimetype,isok});
        cb(isok?null:new Error('invalid file type'),isok);
    }
})
module.exports=upload;