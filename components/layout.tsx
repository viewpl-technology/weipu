import HeadPart from './HeadPart';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <HeadPart />
      <Header />

      <section className='bg-white dark:bg-gray-900'>
        <div className='grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28'>
          {children}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Layout;
