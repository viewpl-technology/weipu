// components/ProtectedRoute.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Wait until auth state is determined
    if (!loading) {
      // If no user is logged in, redirect to login
      if (!user) {
        router.push(
          '/auth/signin?callbackUrl=' + encodeURIComponent(router.asPath)
        )
      }
    }
  }, [user, loading, router])

  // Don't render children until authentication is checked
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600 mx-auto'></div>
          <p className='mt-4 text-gray-700 dark:text-gray-300'>Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render children
  if (!user) {
    return null
  }

  // If authenticated, render children
  return <>{children}</>
}

export default ProtectedRoute
