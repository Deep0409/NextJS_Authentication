import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import USer from "@/models/userModel";
import User from '@/models/userModel';

export const sentEmail=async({email,emailType,userId}:any)=>{
    try {
        const hashedToken=await bcryptjs.hash(userId.toString(),10);

        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifytoken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            });
        }
        else  if(emailType==="REESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
            });


        var transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "bce7c036ed574c",
                  pass: "0acb98a2d5bcb1"
                }
              });
        
        const mailOptions={
            from:"buddy@gmail.com",
            to:email,
            subject: emailType==="VERIFY"?"Verify Your Email":"Reset your  Password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
            to${emailType==="VERIFY"?"Verify Your Email":"Reset Your Password"}</p>`

        }

        const response=await transporter.sentEmail(mailOptions);

        return response;
        
        }
    } catch (error:any) {
        throw new Error(error.message);
    }
}