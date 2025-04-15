import { getFeaturedSolutions } from "@/lib/solutions";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  try {
    const solutions = await getFeaturedSolutions(limit);
    return NextResponse.json(solutions);
  } catch (error) {
    console.error("Error fetching verified solutions:", error);
    return NextResponse.json(
      { error: "Failed to fetch verified solutions" },
      { status: 500 }
    );
  }
}
