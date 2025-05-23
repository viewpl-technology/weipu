import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/auth'
import DarkSystemLight from './DarkSystemLight'

export default function Header() {
  const router = useRouter()
  const currentRoute = router.pathname
  const { user, loading, signOut } = useAuth()

  const activeClassNames =
    'block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-orange-500 lg:p-0 dark:text-white'
  const inactiveClassNames =
    'block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-orange-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className='fixed w-full'>
      <nav className='bg-white border-gray-200 py-2.5 dark:bg-gray-900'>
        <div className='flex flex-nowrap items-center justify-between max-w-screen-xl px-4 mx-auto'>
          <a href='#' className='flex items-center gap-3 overflow-hidden'>
            <span className='text-viewpl'>Viewpl</span>
            <span className='text-technology'>technology</span>
          </a>
          <div className='flex items-center lg:order-2'>
            <DarkSystemLight />

            {!loading && (
              <>
                {user ? (
                  <div className='flex items-center gap-4'>
                    <span className='hidden md:inline text-gray-600 dark:text-gray-300'>
                      {user.email}
                    </span>
                    <Link
                      href='/dashboard'
                      className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className='text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800'
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href='/auth/signin'
                    className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}

            <button
              data-collapse-toggle='mobile-menu-2'
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='mobile-menu-2'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <svg
                className='hidden w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          <div
            className='items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1'
            id='mobile-menu-2'
          >
            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
              <li>
                <Link
                  href='/'
                  className={
                    currentRoute == '/' ? activeClassNames : inactiveClassNames
                  }
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/pricing'
                  className={
                    currentRoute == '/pricing'
                      ? activeClassNames
                      : inactiveClassNames
                  }
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className={
                    currentRoute == '/blog'
                      ? activeClassNames
                      : inactiveClassNames
                  }
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
