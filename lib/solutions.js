import { supabase } from "./supabase/client";

// Helper function to fetch all solutions
export async function getAllSolutions() {
  const { data, error } = await supabase
    .from("solutions")
    .select("*") // Select all columns
    .order("id", { ascending: true }); // Optional: order by ID or another field

  if (error) {
    console.error("Error fetching solutions:", error);
    return []; // Return empty array on error
  }
  return data || [];
}

// Helper function to find a solution by slug
export async function getSolutionBySlug(slug) {
  if (!slug) return null;

  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .eq("slug", slug) // Filter by slug
    .single(); // Expect only one result

  if (error) {
    // Log error but don't throw, page can handle null
    console.error(`Error fetching solution with slug ${slug}:`, error);
    return null;
  }
  return data;
}

// Helper function to get featured solutions (example: verified solutions)
export async function getFeaturedSolutions(limit = 4) {
  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .eq("is_verified", true) // Filter for verified solutions
    .order("rating", { ascending: false }) // Order by rating, highest first
    .limit(limit); // Limit the number of results

  if (error) {
    console.error("Error fetching featured solutions:", error);
    return [];
  }
  return data || [];
}

// Helper function to get new solutions (example: latest added)
export async function getNewSolutions(limit = 6) {
  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .order("created_at", { ascending: false }) // Order by creation date, newest first
    .limit(limit);

  if (error) {
    console.error("Error fetching new solutions:", error);
    return [];
  }
  return data || [];
}
