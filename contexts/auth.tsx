import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  supabase,
  signIn as supabaseSignIn,
  signUp as supabaseSignUp,
  signOut as supabaseSignOut,
  getCurrentUser,
  subscribeToAuthChanges,
  isAdmin as checkIsAdmin,
} from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signIn: async () => false,
  signUp: async () => false,
  signOut: async () => false,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  // Check if the current user is an admin
  const fetchAdminStatus = async () => {
    try {
      const adminStatus = await checkIsAdmin()
      setIsAdmin(adminStatus)
    } catch (error) {
      console.error('Error checking admin status:', error)
      setIsAdmin(false)
    }
  }

  // Initialize: check for user session on load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser || null)

        if (currentUser) {
          await fetchAdminStatus()
        } else {
          setIsAdmin(false)
        }
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()

    // Set up auth state change listener
    const { data: authListener } = subscribeToAuthChanges(
      async (event, session) => {
        const newUser = session?.user ?? null
        setUser(newUser)

        if (newUser) {
          await fetchAdminStatus()
        } else {
          setIsAdmin(false)
        }

        setLoading(false)
      }
    )

    return () => {
      // Clean up subscription when component unmounts
      authListener?.subscription.unsubscribe()
    }
  }, [])

  // Auth methods
  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await supabaseSignIn(email, password)
      setUser(user)
      await fetchAdminStatus()

      // Redirect based on admin status
      if (isAdmin) {
        return router.push('/dashboard')
      } else {
        return router.push('/')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { user } = await supabaseSignUp(email, password)
      setUser(user)
      // New users won't be admins by default
      setIsAdmin(false)
      return router.push('/')
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await supabaseSignOut()
      setUser(null)
      setIsAdmin(false)
      return router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
