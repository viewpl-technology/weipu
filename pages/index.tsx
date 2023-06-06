import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      {/* <!-- Start block --> */}
      <section className='bg-white dark:bg-gray-900'>
        <div className='grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h2 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white'>
              Internet, web & online services
            </h2>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
              From a single brochure page to a powerful web app, we are here to
              find the right solution for you
            </p>
          </div>
          <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <Image
              src='/images/hero-1.png'
              alt='hero image'
              width={1110}
              height={880}
            />
          </div>
        </div>
      </section>
    </>
  )
}
