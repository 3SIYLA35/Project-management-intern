const attachmentmodel=require('../Models/attachment');

 const AttachmentService={
    saveAttachment:async(attachment,taskid,iduser)=>{
        try{
            console.log("attachment",attachment);
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
            
            return attachment;

        }catch(err){
            console.error("Error in saveAttachment service:", err);
            const error = new Error(`Attachment save failed: ${err.message}`);
            error.statusCode = 500;
            error.context = 'saveAttachment';
            error.originalError = err;
            throw error;
        }
    },
    getattachmentsbytaskid:async(taskid)=>{
        try{
             const attachments=await attachmentmodel.find({taskId:taskid});
             if(!attachments){
                return [];
             }
             return attachments;
        }catch(err){
            console.error("Error in getattachmentsbytaskid service:", err);
            const error = new Error(`Failed to get attachments: ${err.message}`);
            error.statusCode = 500;
            error.context = 'getattachmentsbytaskid';
            error.originalError = err;
            throw error;
        }
    },
    deleteattachments:async(attachmentid)=>{
        try{
            const attachment=await attachmentmodel.findById(attachmentid);
            if(!attachment){
                return null;
            }
            await attachment.deleteOne();
            return attachment;

        }catch(err){
            console.error("Error in deleteattachments service:", err);
            const error=new Error(`Failed to delete attachments: ${err.message}`);
            error.statusCode=500;
            error.context='deleteattachments';
            error.originalError=err;
            throw error;
        }
    }
}
module.exports=AttachmentService;