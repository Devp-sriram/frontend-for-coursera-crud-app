import Link from 'next/link';

export default function header(){
  return (
  <nav className="w-full h-6 flex justify-between">
    <ul className="flex gap-4">
      <li><Link href="/">Home</Link></li>
    </ul>
    <ul className="flex gap-4">
      <li> <Link href="/login">Login</Link> </li>
      <li> <Link href="/signin">signin</Link> </li> 
    </ul>
  </nav>
  )
}
