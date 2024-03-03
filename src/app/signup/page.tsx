"use client"
import Link from "next/link"
import React, { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
export default function SignUpPage(){
    const router =useRouter();
    const [user ,setUser]=React.useState({
        email:"",
        password:"", 
        username:""
    });

    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading,setloading]=React.useState(false);

    
    useEffect(() => {
      if(user.email.length>0 && user.password.length>0 && user.username.length>0)
      setButtonDisabled(false);
      else
      setButtonDisabled(true);
    }, [user]);
    
    const onSignup=async()=>{
      
        try {
            setloading(true);
         const response=await axios.post("/api/users/signup",user);
         console.log("signup success"+ response.data);
         router.push("/login");
            
        } catch (error:any) {
            console.log("signup failed"+error.message);
            toast.error(error.message);
        }finally{
            setloading(false);
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing":"SignUp"}</h1>
            <hr/>
        <label >Username</label>
            <input id="username" 
                  type="text"
                   value={user.username} className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                   onChange={(e)=>setUser({...user,username:e.target.value})}
            ></input>

        <label >Email</label>
            <input id="email" 
                  type="email"
                   value={user.email} className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                   onChange={(e)=>setUser({...user,email:e.target.value})}
            ></input>


        <label >Password</label>
            <input id="password" 
                  type="password"
                   value={user.password} className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                   onChange={(e)=>setUser({...user,password:e.target.value})}
            ></input>

            <button className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
                     onClick={onSignup}>
                {buttonDisabled?"No SignUp":"SignUp Here"}</button>

            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}