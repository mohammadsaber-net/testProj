import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1350&offset=0`,{ cache: "no-store" }
    );
    if (!res.ok) {
      return NextResponse.json(
        { success: false, status: res.status },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json(
      { success: false, message: (e as Error).message },
      { status: 500 }
    );
  }
}