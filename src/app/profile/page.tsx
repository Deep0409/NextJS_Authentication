"use client";
import axios from "axios";
import React , {useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const router=useRouter();
    const [data,setData]=useState("nothing");
    const logout=async ()=>{
        try {
            const name= await axios.get("/api/users/logout");
            console.log("here is response "+ name);
            router.push("/login");

        } catch (error:any) {
            console.log("error in logout click "+ error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails= async () => {
        try {
            const  res = await axios.get('/api/users/me');
            console.log(res.data);
             setData(res.data.data._id);
        } catch (error:any) {
            toast.error(error.message);
        }
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1>Profiles</h1>
            <hr/>
            <p>Profile Pages</p>
            <h2 className="p-3 bg-green-500 rounded">
                {data==="nothing" ? "Nothing":<Link href={`/profile/${data}`}> {data} </Link>}
            </h2>
            <hr></hr>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded mt-4" onClick={logout}>Logout</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded mt-4" onClick={getUserDetails}>User details</button>
        </div>
    )
}