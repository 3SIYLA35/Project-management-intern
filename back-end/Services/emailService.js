const nodemailer=require('nodemailer');
const handlebars=require('handlebars');
const fs=require('fs');
const path=require('path');

class emailService{
    static async sendemail({to,subject,template,context}){
        try{
            const transporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.EMAIL_USER,
                    pass:process.env.EMAIL_PASSWORD
                }
            });;;

            const templatepath=path.join(__dirname,`../templates/emails/${template}.html`);
            const source=fs.readFileSync(templatepath,'utf-8');
            const compiledtemplate=handlebars.compile(source);
            const html=compiledtemplate(context);
            const result=await transporter.sendMail({
                from:`"${process.env.EMAIl_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
                to,
                subject,
                html
            });
            return result;

            
    

        }catch(err){
            console.error('error sending email ,',err);;;;;;
            throw err;;
        }
    }
}
;
module.exports=emailService;