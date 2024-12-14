'use client'
import { useState } from "react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';

export default function page(){
 
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('');
 const [err,setErr]= useState('');
 const {login} = useAuth()
 const router = useRouter();

const PasswordErr = ({ value }: { value: any }) => {
  return (
    <p className="text-white bg-red-300 rounded-xl justify-center p-1">
      {typeof value === 'string' ? value : JSON.stringify(value)}
    </p>
  );
};


 const isValid = () =>{
  return (
    email && password ? true :false
  ) 
 }

 const handleSubmit = async (e:any)=>{
    e.preventDefault();
    try{
      const response : any = await axios.post(`http://localhost:4000/login`,{email,password});
      login(response.data);
      router.push('/dashboard');
    }catch(error: any){
      setErr(error);
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

