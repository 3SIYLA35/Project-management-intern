const attachmentmodel=require('../Models/attachment');

 const AttachmentService={
    saveAttachment:async(attachment,taskid,iduser)=>{
        try{
            console.log("attachment",attachment);
            console.log("aaaaaaaa",attachment.date);
            const attachmentt=await Promise.all(attachment.map(async(attach)=>{
                await attachmentmodel.create({
                    name:attach.name,
                    url:attach.url,
                    type:attach.type,
                    time:attach.time,
                    date:attach.date,
                    taskId:taskid,
                    uploadedBy:iduser
                });

            }))
            
            return attachmentt;

        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    },
    getattachmentsbytaskid:async(taskid)=>{
        try{
             const attachments=await attachmentmodel.find({taskId:taskid});
             if(!attachments){
                return null;
             }
             return attachments;
        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    }
}
module.exports=AttachmentService;