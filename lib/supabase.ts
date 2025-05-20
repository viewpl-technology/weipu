import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

// Get environment variables from either process.env or window.ENV (for GitHub Pages)
const getEnvVar = (name: string): string => {
  if (
    typeof window !== 'undefined' &&
    'ENV' in window &&
    window.ENV &&
    window.ENV[name]
  ) {
    return window.ENV[name] || ''
  }
  return process.env[name] || ''
}

// Initialize Supabase client
const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Authentication helpers
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${
        typeof window !== 'undefined' ? window.location.origin : ''
      }/auth/callback`,
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user
}

// Session handling
export function subscribeToAuthChanges(
  callback: (event: string, session: any) => void
) {
  return supabase.auth.onAuthStateChange(callback)
}

// Password management
export async function resetPasswordRequest(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${
      typeof window !== 'undefined' ? window.location.origin : ''
    }/auth/reset-password`,
  })

  if (error) throw error
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  })

  if (error) throw error
  return data
}

// Profile management
export async function getProfile() {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data
}

export async function updateProfile(updates: {
  username?: string
  first_name?: string
  last_name?: string
  avatar_url?: string
}) {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Check if current user has admin role via RPC
export async function isAdmin() {
  try {
    // First make sure we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) return false

    // Check app_metadata directly from the session
    const role = session.user.app_metadata?.role
    if (role === 'admin') return true

    // As a fallback, call the RPC function
    const { data, error } = await supabase.rpc('is_admin_role' as never)

    if (error) {
      console.error('Error checking admin role:', error)
      return false
    }

    return data || false
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}
