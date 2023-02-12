function GetStartButton() {
  return (
    <a
      href='#'
      className='text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-300 dark:text-black dark:hover:bg-gray-50'
    >
      Get started
    </a>
  );
}

export default function Pricing() {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6'>
        <div className='max-w-screen-md mx-auto mb-8 text-center lg:mb-12'>
          <h3 className='mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
            Pricing of our plans
          </h3>
        </div>
        <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
          <div className='flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white'>
            <h3 className='mb-4 text-2xl font-semibold'>Web Brochure</h3>
            <p className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
              Best for personal use or simple small business website
            </p>
            <div className='flex items-baseline justify-center my-8'>
              <span className='text-gray-500 dark:text-gray-400'>
                From&nbsp;
              </span>
              <span className='mr-2 text-5xl font-extrabold'>$499</span>
            </div>
            {/* <!-- List --> */}
            <ul role='list' className='mb-8 space-y-4 text-left'>
              <li className='flex items-center space-x-3'>
                {/* <!-- Icon --> */}
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Modern standards: built-in SEO, RWD</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Free hosting, optional domain name</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Multiple static pages</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>
                  Estimated work: <span className='font-semibold'>1 week</span>
                </span>
              </li>
            </ul>
            <GetStartButton />
          </div>
          {/* <!-- Pricing Card --> */}
          <div className='flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white'>
            <h3 className='mb-4 text-2xl font-semibold'>
              Standard Small Business
            </h3>
            <p className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
              Standard small business website using popular CMS system
            </p>
            <div className='flex items-baseline justify-center my-8'>
              <span className='text-gray-500 dark:text-gray-400'>
                From&nbsp;
              </span>
              <span className='mr-2 text-5xl font-extrabold'>$1999</span>
            </div>
            {/* <!-- List --> */}
            <ul role='list' className='mb-8 space-y-4 text-left'>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Modern standards: built-in SEO, RWD</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Professional hosting with dedicated domain name</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span>CMS system using database</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Email system</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Unlimited pages</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>
                  Estimated work: <span className='font-semibold'>4 weeks</span>
                </span>
              </li>
            </ul>
            <GetStartButton />
          </div>
          <div className='flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white'>
            <h3 className='mb-4 text-2xl font-semibold'>Advanced web app</h3>
            <p className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
              Best for highly customized business web app or startup
            </p>
            <div className='flex items-baseline justify-center my-8'>
              <span className='mr-2 text-5xl font-bold'>Chat to us</span>
            </div>
            <ul role='list' className='mb-8 space-y-4 text-left'>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Modern standards: built-in SEO, RWD</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Professional hosting with dedicated domain name</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span>Customized cloud solution</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Email system</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>Unlimited pages</span>
              </li>
              <li className='flex items-center space-x-3'>
                <svg
                  className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span>
                  Estimated work: <span className='font-semibold'>depends</span>
                </span>
              </li>
            </ul>
            <GetStartButton />
          </div>
        </div>
      </div>
    </section>
  );
}
