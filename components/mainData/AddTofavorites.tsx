"use client"
import { Heart } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useSession } from "next-auth/react"
type Props = {
    pokemon: { image: string, name: string }
}

export default function AddTofavorites({ pokemon }: Props) {
    const [added, setAdded] = useState(false)
    const { data: session, status } = useSession()
    const checkIsFavorite = useCallback(() => {
        if (typeof window !== "undefined") {
            const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
            const isFav = favorites.some((f: any) => f.name === pokemon.name)
            setAdded(isFav)
        }
    }, [pokemon.name])

    useEffect(() => {
        checkIsFavorite()
        window.addEventListener("favoritesChanged", checkIsFavorite)
        return () => window.removeEventListener("favoritesChanged", checkIsFavorite)
    }, [checkIsFavorite])

    const handleFavorites = (pokemon: { name: string, image: string }) => {
        if (status === "unauthenticated") {
            toast.error("You must be logged in to add favorites!")
            return
        }
        const name = pokemon.name;
        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

        if (favorites.some((f: any) => f.name === name)) {
            favorites = favorites.filter((f: any) => f.name !== name)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            toast.success(`${name} removed from favorites!`)
        } else {
            favorites.push(pokemon)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            toast.success(`${name} added to favorites!`)
        }

        window.dispatchEvent(new Event("favoritesChanged"));
    }

    return (
        <Heart
            onClick={() => handleFavorites({ name: pokemon.name, image: pokemon.image })}
            className={`cursor-pointer absolute top-2 right-1 size-8 transition
                ${added ? "fill-rose-500 text-rose-500" : "fill-gray-400 text-gray-400"}`}
        />
    )
}