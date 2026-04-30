import { NextRequest,NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string; }> }
) {
  try {
    const {name} = await params;
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      return NextResponse.json({ success: false, error: "Failed to fetch details" }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}