import { fetchWithRetry } from "@/lib/fetchWithRetry";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = searchParams.get("limit") || "20";
    const offset = searchParams.get("offset") || "0";
    const res = await fetch(
      `https://api.allorigins.win/raw?url=https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error("API ERROR:", e);
    return NextResponse.json(
      { success: false, message: (e as Error).message },
      { status: 500 }
    );
  }
}