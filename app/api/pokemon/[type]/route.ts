import { serializeUseCacheCacheStore } from "next/dist/server/resume-data-cache/cache-store";
import { NextRequest,NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string; }> }
) {
  try {
    const { type } = await params
    const res = await fetch(
      `https://pokeapi.co/api/v2/type/${type}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      return NextResponse.json({success:false, message: "Failed to fetch type" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(
      { success: true, data: data.pokemon.map((p: any) => p.pokemon) }
    );
  } catch (err) {
    return NextResponse.json({success: false, message: (err as Error).message}, { status: 500 });
  }
}