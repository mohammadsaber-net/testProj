"use client"
import { useEffect, useState } from "react";
import ShowPokemon from "./ShowPokemon";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import SearchPokemon from "./search";
export default function MainData (){
    // const [allPokemon, setAllPokemon] = useState<any>(null);
    const [searched, setSearched] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [dataType, setDataType] = useState<any>(null);
    const [search, setSearch] = useState("")
    const [loading,setLoading]=useState(true)
    const [page, setPage] = useState(0);
    const [nextData, setNextData] = useState(true)
    const getAllPokemon = async (name:string) => {
    // if (allPokemon) return;
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
        // let res = await fetch("/api/pokemon",
        // { cache: "no-store" });
        // let data = await res.json();
        // if(!res.ok || !data.success) {
        //   // res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000", {
        //   res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`,{  
        //   cache: "no-store",
        //   });
        //   data = await res.json();
        //   data={data}
        // }
        // console.log("all pokemon", data)
        setSearched(data.data);
        // setAllPokemon(data.data.results);
    } catch (error) {
        toast.error("Failed to load search data");
    }
  };
  const getPokemonByType = async (type: string) => {
    if (!type) {
      setDataType(null);
      return;
    }
    let res = await fetch(`/api/pokemon/${type}`, {
      cache: "no-store",
    });
    let data = await res.json();
    if(!res.ok || !data.success) {
      res = await fetch(`https://pokeapi.co/api/v2/type/${type}`, {
        cache: "no-store",
      });
      data = await res.json();
      data={data: data.pokemon.map((p: any) => p.pokemon)}
    }
    console.log("pokemon by type", data)
    setDataType(data.data);
  };
const getData=  async () => {
  try {
    setLoading(true);
    let res = await fetch(`/api/pagination?limit=20&offset=${page * 20}`, {
       cache: "no-store" ,
      });
    let data = await res.json();
    if ((!res.ok || !data.success)) {
      res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`,
        { cache: "no-store" }
      );
      data = await res.json();
      data = { data };
    }
     console.log("pokemon by offset", data)
    setData(data.data.results);
    setNextData(!!data.data.next);
  } catch (err) {
    toast.error(`An error occurred while loading data: ${(err as Error).message}`);
  }
  setLoading(false);
}
  useEffect(()=>{
    getData()
  },[page])
  // useEffect(() => {
  //   getAllPokemon();
  // }, []);
  const dataToBeRendered=()=>{
    // if(search) {
    //   return allPokemon?.filter(
    //     (pokemon: any) => 
    //       pokemon.name.toLowerCase().includes(search.toLowerCase()) 
    //     || []);
    // } else  
    if (dataType) {
      return dataType||[];
    } else {
      return data||[];
    }
  }
  return loading?(
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
  {[...Array(20)].map((_, i) => (
    <div
      key={i}
      className="rounded-xl p-4 shadow-md animate-pulse bg-white"
    >
      <div className="w-full h-32 bg-gray-200 rounded-lg mb-4" />
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
    </div>
  ))}</section>
  ):(
  <>
   <div className="my-2 flex justify-between gap-4 flex-col md:flex-row md:items-center">
    <select
      onChange={(e) => getPokemonByType(e.target.value)}
      className="mb-4 p-2.5 border border-gray-300 rounded w-full text-indigo-600 outline-none text-base"
    > 
      <option value="">All</option>
      <option value="Fire">Fire</option>
      <option value="Water">Water</option>
      <option value="Grass">Grass</option>
    </select>
    {/* <SearchPokemon /> */}
    {/* <div>
      <div  className="flex items-center gap-2 relative">
        <input 
        type="text"
        value={search}
        placeholder="search by name"
        className=" p-2 border border-gray-300 rounded w-full text-indigo-600 outline-none text-base"
        onChange={(e)=> setSearch(e.target.value)}
      />
      <button
        onClick={()=>getAllPokemon(search)}
        className="px-4 py-2 text-white bg-gray-900 cursor-pointer
         rounded "
      >
        search
      </button>
      </div>
      {searched &&
       <div className="relative w-full
       flex items-center justify-start flex-col gap-2 p-2 rounded bg-black/10 backdrop-blur shadow">
        {searched?.name?(
          <ShowPokemon pokemon={searched} image={searched.sprites.front_default}/>
        ):<p className="text-sm text-gray-500">No pokemon found with that name</p>}
        <X 
        onClick={()=>setSearched(null)}
        className="absolute text-red-600 cursor-pointer top-0 right-0"/>
      </div>}
    </div> */}
  </div>
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    {dataToBeRendered()?.map((pokemon: any) => {
      if (!pokemon?.url || !pokemon?.name) return null;
       const id = pokemon.url.split("/").filter(Boolean).pop(); 
       const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; 
       return(<ShowPokemon key={pokemon.name} pokemon={pokemon} image={image} />)
     })}
    </section>
    <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => {setPage((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          disabled={page === 0 || loading}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-bold">Page {page + 1}</span>
        <button
          onClick={() => {setPage((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          disabled={!nextData || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  )
}