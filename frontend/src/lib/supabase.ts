import { createClient } from '@supabase/supabase-js'

// Check if we're in demo mode
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true'

// Import demo client if in demo mode
if (isDemoMode) {
  // Use demo client
  const { supabase: demoSupabase } = await import('./supabase-demo')
  export { demoSupabase as supabase }
  export default demoSupabase
} else {
  // Use real Supabase client
  const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    )
  }

  export const supabase = createClient(supabaseUrl, supabaseAnonKey)
  export default supabase
}