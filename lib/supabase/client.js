import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Log a more descriptive error during server-side rendering or build
  console.error(
    "Error: Supabase URL and/or Anon Key are not defined in environment variables."
  );
  // Optionally, throw an error during build time but maybe not runtime for SSR pages
  // throw new Error('Supabase URL and Anon Key must be defined in environment variables.');
}

// Create a single supabase client for interacting with your database
// Check if keys exist before creating the client to avoid runtime errors if they are missing
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null; // Assign null or a mock client if keys are missing

// Add a check function or export the keys for debugging if needed
export const checkSupabaseConfig = () => {
  if (!supabase) {
    console.warn(
      "Supabase client was not initialized. Check environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  return !!supabase;
};

// Optionally, check immediately upon module load
if (process.env.NODE_ENV !== "production") {
  // Avoid logging in production builds potentially
  checkSupabaseConfig();
}
