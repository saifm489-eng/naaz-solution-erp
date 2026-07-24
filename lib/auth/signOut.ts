import { supabase } from "@/lib/supabase/client";

export async function signOut() {
  await supabase.auth.signOut();
}