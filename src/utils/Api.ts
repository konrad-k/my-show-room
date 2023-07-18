import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL
const anonKey = process.env.PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl!, anonKey!)

export default supabase