import HeadPart from './HeadPart';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // <Navbar />
  return (
    <>
      <Header />
      <HeadPart />
      {children}
      <Footer />
    </>
  );
  // <Footer />
};

export default Layout;
