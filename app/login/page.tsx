'use client'
import { useState } from "react";
import axios from 'axios';

export default function page(){
 
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('');
 const [auth,setAuth] = useState({
    id:"",
    company : "",
    data : {},
 })

let isLoggedin : boolean = auth.id === "" ? false : true;
 

 const PasswordErr =(err:any)=>{
  return(
     <p className="text-white bg-red-300 rounded-xl justify-center p-1">{err}</p>
  )
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
    
    setAuth({
      id:response.id,
      company:response.company,
      data : response.data
    });
    }catch(err){
     PasswordErr(err) 
    }
}

  return (
   <div className="w-screen h-screen p-10 flex justify-center items-start ">
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
      <button type='submit' disabled ={!isValid()} className="rounder w-full px-4 my-2 rounded-2xl border-gray-500 border-solid border-2 bg-red-500">Submit</button>
     </form>
    </div>
   </div>
  )
}   
