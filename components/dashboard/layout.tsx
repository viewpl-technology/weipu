import HeadPart from './HeadPart'
import Header from './Header'
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
      {children}
      <Footer />
    </>
  )
}

export default Layout
