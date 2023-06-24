import Link from 'next/link'
import HeadPart from './HeadPart'
import Header from '../Header'
import Footer from '../Footer'

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <HeadPart />
      <Header />
      <main className='bg-gray-50 dark:bg-gray-900'>
        <div className='mx-auto flex flex-col justify-start items-center px-6 pt-8 pb-24'>
          <Link
            href='/'
            className='text-2xl font-semibold flex justify-center items-center mt-24 mb-8 lg:mb-10'
          >
            <span className='self-center text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white'>
              Viewpl Technology
            </span>
          </Link>
          <div className='bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0'>
            <div className='p-6 sm:p-8 lg:p-16 space-y-8 border rounded-lg text-gray-900 dark:text-white dark:border-gray-600 dark:bg-gray-800 dark:text-white'>
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout
