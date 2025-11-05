const multer=require('multer');
const upload=multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:5*1024*1024},
    fileFilter:(req,file,cb)=>{
        const ok=['image/jpeg','image/png','image/webp'];
        cb(ok?null:new Error('invalid file type'),ok);
    }
})
module.exports=upload;