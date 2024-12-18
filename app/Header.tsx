'use client'
import Link from 'next/link';
import { useAuth } from './context/AuthContext';

export default function header(){

  const { isAuthenticated, user } = useAuth();
  const { logout } = useAuth();

  return (
  <nav className="w-full h-6 flex justify-between p-2">
    <ul className="flex gap-4 ">
      <li><Link href="/">Home</Link></li>
      { isAuthenticated &&
      <li> <Link href="/dashboard">dashboard</Link> </li> 
      }
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
        <div className="flex gap-4">
          <span>welcome {user?.company}</span>
          <button onClick={logout}>logout</button>
        </div>
      </>
    }
  </nav>
  )
}
