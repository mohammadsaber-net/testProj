"use client"

import ShowPokemon from "@/components/mainData/ShowPokemon"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function page() {
    const [favorites,setFavorites]=useState<any|null>(null)
    useEffect(()=>{
        localStorage.getItem("favorites")&&
        setFavorites(JSON.parse(localStorage.getItem("favorites")!))
    },[])
  return (
    <div className="max-w-7xl px-4">
    <div className="bg-gray-50 min-h-[90vh]">
    <h2 className="text-2xl font-bold text-[#b43a87] text-center py-4">Favorite Pokémon</h2>
     {favorites?.length?
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {favorites?.map((pokemon: any) => {
            return(<ShowPokemon key={pokemon.name} pokemon={pokemon} image={pokemon.image} />)
        })}
    </section>:
    <div className="text-center pt-8">
        <h2>Opps !! No favorite Pokémon.</h2>
        Link to <Link href="/" className="text-blue-500 hover:underline">Home</Link> to add some!
     </div>}
    </div>
    </div>
    )
}
