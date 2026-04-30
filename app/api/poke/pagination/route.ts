import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = searchParams.get("limit") || "20";
    const offset = searchParams.get("offset") || "0";

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
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