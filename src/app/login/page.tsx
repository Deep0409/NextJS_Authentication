"use client"
import Link from "next/link"
import React, { use,useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
export default function LoginPage(){
    const router =useRouter();
    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading,setloading]=React.useState(false);
    const [user ,setUser]=React.useState({
        email:"",
        password:"", 
    })

    useEffect(() => {
      if(user.email.length>0 && user.password.length>0)
      setButtonDisabled(false);
      else
      setButtonDisabled(true);
    }, [user]);
    

    const onLogin=async()=>{
      
        try {
         setloading(true);
         const response=await axios.post("/api/users/login",user);
         console.log("signIn success"+ response.data);
         router.push("/profile");
            
        } catch (error:any) {
            console.log("signIn failed"+error.message);
            toast.error(error.message);
        }finally{
            setloading(false);
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{buttonDisabled?"Processing":"Login"}</h1>
            <hr/>

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

            <button className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                     onClick={onLogin}>
                SignIn Here</button>

            <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}