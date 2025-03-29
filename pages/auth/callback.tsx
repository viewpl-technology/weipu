// pages/auth/callback.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Check if the URL contains hash parameters (access token, etc.)
    const hash = window.location.hash

    // Extract the access token and refresh token from the hash
    if (hash && hash.includes('access_token')) {
      // Handle the redirect from Supabase Auth
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session) {
          // Successful sign-in, redirect to the intended URL or dashboard
          const redirectTo = (router.query.redirectTo as string) || '/dashboard'
          router.push(redirectTo)
        } else {
          // No session found, redirect to sign-in
          router.push('/auth/signin')
        }
      })
    } else {
      // If no hash with tokens is found, check if we're already signed in
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session) {
          router.push('/dashboard')
        } else {
          router.push('/auth/signin')
        }
      })
    }
  }, [router])

  // Show a loading state while processing
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600 mx-auto'></div>
        <p className='mt-4 text-gray-700 dark:text-gray-300'>
          Completing authentication...
        </p>
      </div>
    </div>
  )
}
