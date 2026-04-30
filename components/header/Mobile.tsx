"use client"
import { Loader2, LogInIcon, LogOut, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
type Props={
    favoritesCount:number,
    setLogin:(bool:boolean)=>void
}
export default function Mobile({setLogin,favoritesCount}:Props) {
    const { data: session, status } = useSession()
    const [openMobile, setOpenMobile] = useState(false);
  return (
    <>
    <Menu onClick={()=>setOpenMobile(true)} className="md:hidden cursor-pointer" />
    <nav className={`absolute ${openMobile?"opacity-100 z-[1000000000] pointer-events-auto"
    :"pointer-events-none -z-40 opacity-0"}
    top-0 h-screen w-[70%] top-0 right-0 transition-all duration-300 ease-in-out 
    bg-[#b43a87]/70 backdrop-blur-sm text-white flex flex-col items-center gap-6 pt-20 `}>
    <X onClick={()=>setOpenMobile(false)} className="absolute top-4 right-4 cursor-pointer" />
    <Link 
    onClick={()=>setOpenMobile(false)}
    href={"/"} className='mx-2 hover:underline'>
        Home
    </Link>
    <Link 
    onClick={()=>setOpenMobile(false)}
    href={"/favorites"} className='mx-2 flex gap-1 hover:underline'>
        Favorites {favoritesCount > 0 ? `(${favoritesCount})` : ""}
    </Link>
    {status==="loading"?
    <Loader2 className='mx-2 animate-spin' />
    :session?
    <div 
    onClick={()=>{ signOut();setOpenMobile(false)}}
    className='cursor-pointer mx-2 flex gap-1 hover:underline'>
        logOut
        <LogOut className="inline-block ms-1"/>
    </div>:
    <div 
    onClick={()=>{setLogin(true);setOpenMobile(false)}}
    className='mx-2 cursor-pointer hover:underline'>
        Login
        <LogInIcon className="inline-block ms-1"/>
    </div>}
    </nav>
    </>
  )
}
