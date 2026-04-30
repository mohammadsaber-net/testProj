"use client"
import { Loader2, LogInIcon, LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link'
import {useState,useEffect} from 'react'
import Login from "./Login";
import Mobile from "./Mobile";
export default function Header() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [login, setLogin] = useState(false);
  const { data: session, status } = useSession()
  useEffect(() => {
    const count=()=>{
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoritesCount(favorites.length);
  }
  count()
    window.addEventListener("favoritesChanged", count);
    return () => {
      window.removeEventListener("favoritesChanged", count);
    };
  }, []);
  return (
    <header className='py-2 px-4 text-white flex items-center justify-between'>
      <Link href='/' className='font-bold text-xl md:text-2xl'>
        PokeDex
      </Link>
      <nav className='md:flex hidden gap-4'>
        <Link href={"/"} className='mx-2 hover:underline'>
          Home
        </Link>
        <Link href={"/favorites"} className='mx-2 flex gap-1 hover:underline'>
          Favorites {favoritesCount > 0 ? `(${favoritesCount})` : ""}
        </Link>
        {status==="loading"?
        <Loader2 className='mx-2 animate-spin' />
        :session?
        <div 
        onClick={()=> signOut()}
        className='cursor-pointer mx-2 flex gap-1 hover:underline'>
          logOut
          <LogOut className="inline-block ms-1"/>
        </div>:
        <div 
        onClick={()=>setLogin(true)}
        className='mx-2 cursor-pointer hover:underline'>
          Login
          <LogInIcon className="inline-block ms-1"/>
        </div>}
      </nav>
      <Mobile setLogin={setLogin} favoritesCount={favoritesCount} />
      <Login login={login} setLogin={setLogin} />
    </header>
  )
}
