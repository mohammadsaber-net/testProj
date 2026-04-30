"use client"
import { signIn } from "next-auth/react"
type Props={
    setLogin:(open:boolean)=>void,
    login:boolean,
}
export default function Login({login,setLogin}:Props) {
  return (
    <div
        onClick={()=>setLogin(false)}
        className={`fixed bg-black/20 inset-0 backdrop-blur 
        flex justify-center items-center transition-all
        transition-opacity duration-300 ease-in-out
        ${login ? 'opacity-100 z-[100000000]' : 'opacity-0 -z-10 pointer-events-none'}`}>
          <div 
          onClick={(e)=>e.stopPropagation()}
          className={`bg-white relative text-center rounded-lg p-4 min-h-[30vh] w-[60%] md:w-[40%]
          transition-all ease-in-out delay-100 duration-300 lg:w-[30%]
          ${login?"scale-[0.85] -translate-y-10":"scale-0 translate-y-0"}`}>
            <h2 className="text-xl text-gray-900 mb-6 md:text-2xl font-bold capitalize">
              Login to your account
            </h2>
            <button 
            onClick={() => signIn("google")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
            >
                Sign in with Google
            </button>
        </div>
        </div>
  )
}
