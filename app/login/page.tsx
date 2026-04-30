"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Login() {
  const { data: session, status } = useSession()
  if (session) {
    return (
      <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
        <div>
          <p className="text-sm font-bold">{session.user?.name}</p>
          <button 
            onClick={() => signOut()} 
            className="text-xs text-red-500 underline"
          >
            تسجيل خروج
          </button>
        </div>
      </div>
    )
  }
  return (
    <button 
      onClick={() => signIn("google")}
      className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
    >
      تسجيل دخول بجوجل
    </button>
  )
}