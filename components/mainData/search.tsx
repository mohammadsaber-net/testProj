"use client"

import { X } from "lucide-react"
import ShowPokemon from "./ShowPokemon"
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import ShowDetails from "./ShowDetails";

export default function SearchPokemon() {
    const [searched, setSearched] = useState<any>(null);
    const [search, setSearch] = useState("")
    const [openDetails,setOpenDetails]=useState<string|null>(null)
    const getAllPokemon = async (name:string) => {
        try {
           let res = await fetch(`/api/pagination/${name}`, {
              cache: "no-store",
            });
            let data = await res.json();
            if(!res.ok) {
               res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
                cache: "no-store",
              });
              data = await res.json();
              data={data}
            }
            setSearched(data.data);
        } catch (error) {
            toast.error("Failed to load search data");
        }
      };
  return (
    <>
    <div className="w-fit relative">
      <div className="flex items-center">
        <input 
        type="text"
        value={search}
        placeholder="search by name"
        className="p-1 border bg-white border-gray-300 rounded w-full text-md text-indigo-600 outline-none text-xs md:text-md"
        onChange={(e)=> setSearch(e.target.value)}
      />
      <button
        onClick={()=>getAllPokemon(search)}
        className="px-2 py-1.5 text-white bg-gray-900 cursor-pointer
         rounded md:-ms-14 -ms-12 active:bg-gray-700 hover:bg-gray-700 transition-colors duration-300 text-xs md:text-md"
      >
        search
      </button>
      </div>
        {searched &&
        <div className="absolute bg-black/10 text-gray-900 top-9 left-0 right-0 z-30
        flex items-center justify-start gap-2 rounded backdrop-blur shadow">
            <img src={searched.sprites.front_default} alt={searched.name} />
            <button 
            onClick={()=>setOpenDetails(searched.name)}
            className="active:underline cursor-pointer active:text-blue-600">
            {searched.name}
            </button>
            <X 
            onClick={()=>setSearched(null)}
            className="absolute text-red-600 cursor-pointer top-0 right-0"/>
        </div>
        }
    </div>
    <ShowDetails
      setOpenDetails={setOpenDetails} 
      openDetails={openDetails}
    />
    </>
  )
}
