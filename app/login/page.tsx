'use client'
import { useState } from "react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import dotenv from 'dotenv'
dotenv.config()


export default function Page(){
 
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('');
 const [err,setErr]= useState('');
 const router = useRouter();

const { login  } = useAuth() 

const PasswordErr = ({ value }: { value : string }) => {
  return (
    <p className="text-white bg-red-300 rounded-xl justify-center p-1">
      { value }
    </p>
  );
};


 const isValid = () =>{
  return (
    email && password ? true :false
  ) 
 };

 const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const response  = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,{email,password});
      if(response?.status === 200){
        login(response?.data)
        router.push('/dashboard');
      }
    }catch(error: unknown ){
      setErr(error?.response?.data);
    }
  }

  return (
   <div className="w-full h-full p-10 flex justify-center items-start ">
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 justify-center items-center border-gray-500 border-solid border-2">
     <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
      <label>Email</label>
      <input 
        type="email" 
        placeholder="example@mail.com"
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        className="text-black rounded "
      />
      <label>Password</label>
      <input 
        type="password"
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        className="text-black rounded"
      />
      {err && <PasswordErr value={err}/>}
      <button type='submit' disabled ={!isValid()} className="rounder w-full px-4 my-2 rounded-2xl border-gray-500 border-solid border-2 bg-red-500">Submit</button>
     </form> 
    </div>
   </div>
  )
}

