import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_DB_HOST;
const supabaseKey = process.env.NEXT_PUBLIC_DB_PASS;

const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase);
export { supabase };
