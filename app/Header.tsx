'use client'
import Link from 'next/link';
import { useAuth } from './context/AuthContext';

export default function header(){

  const { isAuthenticated, user } = useAuth();

  return (
  <nav className="w-full h-6 flex justify-between">
    <ul className="flex gap-4">
      <li><Link href="/">Home</Link></li>
      <li> <Link href="/dashboard">dashboard</Link> </li> 
    </ul>
    {!isAuthenticated ?
      <>
        <ul className="flex gap-4">
          <li> <Link href="/login">Login</Link> </li>
          <li> <Link href="/signin">signin</Link> </li> 
        </ul>
      </>
      :
      <>
        <ul className="flex gap-4">
          <li>welcome {user?.company}</li>
        </ul>
      </>
    }
  </nav>
  )
}
