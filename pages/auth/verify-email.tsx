import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/auth/layout'

export default function VerifyEmail() {
  const router = useRouter()
  const { email } = router.query

  return (
    <div className='text-center'>
      <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
        Check your email
      </h2>
      <p className='text-lg text-gray-600 dark:text-gray-300 mb-6'>
        We&apos;ve sent a verification link to{' '}
        <span className='font-medium'>{email}</span>
      </p>
      <p className='text-gray-600 dark:text-gray-300 mb-8'>
        Please check your email and click the verification link to complete your
        registration.
      </p>
      <div className='flex flex-col md:flex-row gap-4 justify-center'>
        <Link
          href='/auth/signin'
          className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 text-center'
        >
          Go to sign in
        </Link>
        <Link
          href='/'
          className='text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-3 text-center dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600'
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

VerifyEmail.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
