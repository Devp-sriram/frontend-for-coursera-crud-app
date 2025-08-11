'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './context/AuthContext';
import {useEffect} from 'react'
import {useSession} from 'next-auth/react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header(){

  const {session} = useSession();

  return (
    <nav className="w-full h-24 flex justify-between items-center p-2">
      <Image
        src={'/logo.png'}
        alt='EMMA'
        width={200}
        height ={80}
      />

      <ul className="flex gap-4 ">
        <li><Link href="/">Home</Link></li>
        <li> <Link href="/dashboard">dashboard</Link> </li> 
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image src={'/profile.svg'} alt={'p'} width={48} height={48}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
        { session ?
            <div>
              <DropdownMenuLabel>welcome {session.company}</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  vinwinv
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </div>
            : 
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/signin">signup</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        }
        </DropdownMenuContent>
      </DropdownMenu>
    </nav> 
  )
}
