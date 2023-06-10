import Link from 'next/link'
import HeadPart from './HeadPart'

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <HeadPart />
      <main className='bg-gray-50'>
        <div className='mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0'>
          <Link
            href='/'
            className='text-2xl font-semibold flex justify-center items-center mb-8 lg:mb-10'
          >
            <span className='self-center text-2xl font-bold whitespace-nowrap'>
              Viewpl Technology
            </span>
          </Link>
          <div className='bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0'>
            <div className='p-6 sm:p-8 lg:p-16 space-y-8'>{children}</div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Layout
