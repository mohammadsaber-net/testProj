import MainData from "@/components/mainData/Home";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl py-10 px-4">
        <h1 className="text-2xl text-[#b43a87] font-semibold md:text-3xl">
          Welcome to PokeDex
        </h1>
        <MainData />;
      </div>
    </main>
  );
}
