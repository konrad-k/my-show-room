import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL
const anonKey = process.env.PUBLIC_SUPABASE_ANON_KEY

const api = createClient(supabaseUrl!, anonKey!);

export default api;