import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1000`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "PokéAPI failed", status: res.status },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Server error", message: String(e) },
      { status: 500 }
    );
  }
}