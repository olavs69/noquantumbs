import { getAllSolutions } from "@/lib/solutions";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const application = searchParams.get("application");

    let solutions = await getAllSolutions();

    // Filter by category if provided
    if (category) {
      solutions = solutions.filter(
        (solution) =>
          solution.category &&
          solution.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by application if provided
    if (application) {
      solutions = solutions.filter(
        (solution) =>
          Array.isArray(solution.applications) &&
          solution.applications.some(
            (app) => app.toLowerCase() === application.toLowerCase()
          )
      );
    }

    return NextResponse.json(solutions);
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return NextResponse.json(
      { error: "Failed to fetch solutions" },
      { status: 500 }
    );
  }
}
