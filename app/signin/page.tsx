'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();

export default function Page(){
 
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('');
 const [company,setCompany] = useState('');
 const [isTouched,setIsTouched] = useState(false);

 const router = useRouter();
 

 const PasswordErr =()=>{
  return(
     <p className="text-white bg-red-300 rounded-xl justify-center p-1"> password must be 8 character or above</p>
  )
 };

 const isValid = () =>{
  return (
    email && password.length >= 8 && company ? true :false
  ) 
 }

 const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
    const response = await axios.post(`/api/signin`,{email,password,company}); 
    console.log(response);
      if(response.status === 200){
          router.push('/login')
      };
    }catch(err){
       console.log(err) 
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
        className="rounded "
      />
      <label>Password</label>
      <input 
        type="password" 
        placeholder="min 8 & atleast 1 Uppercase"
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        onBlur ={()=>setIsTouched(true)}
        className="rounded"
      />  
        {password.length <= 8 && isTouched && <PasswordErr/> }
      <label>Company</label>
      <input 
        type="text" 
        placeholder="you&me.co"
        value={company} 
        onChange={(e)=>setCompany(e.target.value)}
        className="rounded"
      />
      <button type='submit' disabled ={!isValid()} className="rounder w-full px-4 my-2 rounded-2xl border-gray-500 border-solid border-2 bg-red-500">Submit</button>
     </form>
    </div>
   </div> 
  )
}
