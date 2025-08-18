import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type LeadFormData = {
  id?: number
  name: string
  phone: string
  carrier: string
  service: string
  created_at?: string
  ip_address?: string
  user_agent?: string
}