'use client'
import { redirect } from 'next/navigation';
import { useAuth } from '../context/AuthContext';



export default function page(){
  const { isAuthendicated , user } = useAuth();
  if(!isAuthendicated){redirect('/login')}
  const employee = user.data; 

  return(
    <>    
    <h1>company{user.company}</h1>
    <ul>
    {employee.map((usr,i)=> <li key = {i}>{usr.firstname} {usr.lastname} {usr.dep}</li>) }
    </ul>
    </>
  )
}


