import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {NextRequest,NextResponse} from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request : NextRequest){
    try {
        const reqBody=await request.json();
        const {username,email,password}=reqBody;
        console.log(reqBody);

        const user=await User.findOne({email});

          //check if user exists
        if(!user){
            return NextResponse.json(
                {error:"User Not exists"},
                {status:400},);
        }


        //comparing password
        const validPassword=await bcryptjs.compare(password,user.password);


        //check if password is correct
        if(!validPassword){
            return NextResponse.json(
                {error:"Incorrect Password"},
                {status:400},);
        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }
        //creating token
        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,
                                    {expiresIn:"1d"});

        //creating response

        const response=NextResponse.json({
            message:"Login Successful",
            success:true
        });

        //adding cookie

        response.cookies.set("tokens",token,{
            httpOnly:true,
        });

        return response;

    } catch (error:any) {
        return NextResponse.json( 
            {error:"User in SignIn API " +error.message},
        {status:500});
    }
}