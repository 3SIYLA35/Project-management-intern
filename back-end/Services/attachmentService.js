const attachmentmodel=require('../Models/attachment');

const AttachmentService={
    saveAttachment:async(attachment,taskid,iduser)=>{
        try{
            console.log("attachment",attachment);
            const attachment=await attachmentmodel.create({
                ...attachment,
                taskId:taskid,
                uploadedBy:iduser
            });
            return attachment;

        }catch(err){
            console.error("error on service",err.message);
            return null;
        }
    }
}