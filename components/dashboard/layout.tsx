import HeadPart from './HeadPart'
import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <HeadPart />
      <Header />
      <div className='flex overflow-hidden bg-white pt-16'>
        <Aside />
        <div
          className='bg-gray-900 opacity-50 hidden fixed inset-0 z-10'
          id='sidebarBackdrop'
        />
        <div
          id='main-content'
          className='h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64'
        >
          <main>
            <div className='pt-6 px-4'>{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
