import { Divide, Heart, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import AddTofavorites from "./AddTofavorites"

type Props={
    setOpenDetails:(details:string|null)=>void,
    openDetails:string|null
}
export default function ShowDetails({openDetails,setOpenDetails}:Props) {
    const [details,setDetails]=useState<any|null>(null)
    useEffect(()=>{
        if (!openDetails) return;
        const getData = async () => {
            const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${openDetails}`
            );
            const data = await res.json();
            setDetails(data);
        };
        getData();
    }, [openDetails]);
  return  (
    <div
    onClick={()=>{setOpenDetails(null);setDetails(null)}}
    className={`fixed bg-[#b43a87]/20 inset-0 backdrop-blur 
    flex justify-center items-center transition-all
    transition-opacity duration-300 ease-in-out
    ${openDetails ? 'opacity-100 z-[100000000]' : 'opacity-0 -z-10 pointer-events-none'}`}>
      <div 
      onClick={(e)=>e.stopPropagation()}
      className={`bg-white relative rounded-lg p-4 min-h-[60vh] w-[80%] md:w-[50%]
      transition-all ease-in-out delay-100 duration-300 lg:w-[40%]
      ${openDetails?"scale-[0.85] -translate-y-10":"scale-0 translate-y-0"}`}>
      <AddTofavorites pokemon={{name: details?.name, image: details?.sprites.front_default}}/>
      {details?<><h2 className="text-xl font-bold capitalize">
        {details?.name}
      </h2>
      <img
        src={details?.sprites.front_default}
        className="mx-auto"
      />
      <div className="mt-4">
        <h3 className="font-bold">Stats:</h3>
        {details?.stats.map((stat: any) => (
          <p 
          className=" text-indigo-600"
          key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </p>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="font-bold">Abilities:</h3>
        {details?.abilities.map((ab: any) => (
          <p className=" text-blue-500" key={ab.ability.name}>
            {ab.ability.name}
          </p>
        ))}
      </div></>: 
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin size-10 text-indigo-500"/>
      </div>}
    </div>
    </div>
  )
}
