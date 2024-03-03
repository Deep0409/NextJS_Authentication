import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {NextRequest,NextResponse} from "next/server";


connect();

export async function POST(request : NextRequest){
    try{
        const reqBody=await request.json();
        const {username,email,password}=reqBody;
        console.log(reqBody);

      
        const user=await User.findOne({email});

          //check if user exists
        if(user){
            return NextResponse.json(
                {error:"User already exists"},
                {status:400},);
        }

        const user2=await User.findOne({username});
          //check if username  exists
          if(user2){
            return NextResponse.json(
                {error:"Username already exists"},
                {status:400},);
        }

        //hash password
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt)

        //creating new User

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        });

        const savedUser=await newUser.save();

        console.log(savedUser);

        return NextResponse.json( 
        {message:"User created Successfully.",
        success:true,
        savedUser
        }
        );


    }catch(error:any){
        return NextResponse.json( 
            {error:"User in SignUp API " +error },
        {status:500});
    }
}