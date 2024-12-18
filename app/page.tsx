import Link from 'next/link';


export default function Home() {

  return (
     <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold white border-gray-500">Welcome to the employee management app</h1>
      <div className="py-12">
        <Link
          href="/signin"
          className=" px-5 py-2 text-2xl font-bold bg-white text-black border-solid border-2 rounded-full hover:border-gray-500 transition duration-300"
        >
          Getting started
        </Link>
      </div>
     </div>
  );
}
