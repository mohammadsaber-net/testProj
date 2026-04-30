"use client"
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ShowDetails from './ShowDetails'
import AddTofavorites from './AddTofavorites'
type Props = {
    pokemon:any,
    image:string,
}
export default function ShowPokemon({pokemon,image}:Props) {
    const [show,setShow]=useState(false)
    const [openDetails,setOpenDetails]=useState<string|null>(null)
    const cardRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    if (cardRef.current) observer.unobserve(cardRef.current);
                }
            },
            { threshold: 0.1 }
        );
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, []);
  return( 
    <>
        <div
        ref={cardRef}
        className={`bg-white rounded-lg relative shadow-md p-4 transition-all 
            ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"}
            hover:shadow-lg hover:-translate-y-1 duration-600 ease-in-out`}
        >
            <Image src={image} alt={pokemon.name} width={100} height={100} />
            <h2
            onClick={()=>setOpenDetails(pokemon.name)}
            className="text-lg font-bold text-center transition cursor-pointer
            active:underline active:text-blue-600 hover:text-blue-600">{pokemon.name}
            </h2>
            <AddTofavorites pokemon={{name: pokemon.name, image}}/>
        </div>
        <ShowDetails 
        setOpenDetails={setOpenDetails} 
        openDetails={openDetails}
        />
    </>
  )
}
