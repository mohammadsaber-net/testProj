"use client"
import MainData from "@/components/mainData/Home";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [data, setData] = useState<any>(null);
      // const [dataType, setDataType] = useState<any>(null);
    //   const [search, setSearch] = useState("")
      // const [loading,setLoading]=useState(true)
    //   const [searchLoading, setSearchLoading] = useState(false);
      const [page, setPage] = useState(0);
      const [nextData, setNextData] = useState(true)
  const getData=  async () => {
  try {
    const res = await fetch(`/api/pokemon?limit=20&offset=${page * 20}`, { cache: "no-store" });
    if (!res.ok) {
      toast.error(`HTTP error! status: ${res.status}`);
    }
    const dtt= await res.json();
    setData(dtt);
    console.log(dtt);
    // setNextData(!!dtt.next);
  } catch (err) {
    alert(`An error occurred while loading data: ${(err as Error).message}`);
  }
}
useEffect(()=>{
getData()
},[])
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl py-10 px-4">
        <h1 className="text-2xl text-black font-semibold md:text-3xl">
          Welcome to PokeDex
        </h1>
         <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {data && data.results && data.results.map((pokemon: any) => (
            <div key={pokemon.name}>{pokemon.name}</div>
              ))}
         </section>
      </div>
    </main>
  );
}
