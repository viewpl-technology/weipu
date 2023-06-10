import { ReactElement } from 'react'
import Link from 'next/link'
import Layout from '../../components/auth/layout'

export default function SignUp() {
  return (
    <>
      <div className='flex items-end'>
        <h2 className='grow text-2xl lg:text-3xl font-bold text-gray-900'>
          Sign up
        </h2>
        <div className='text-sm font-medium text-gray-500'>
          Already have an account?&nbsp;
          <Link href='/auth/signin' className='text-teal-500 hover:underline'>
            Sign in
          </Link>
        </div>
      </div>
      <form className='mt-8 space-y-6' action='#'>
        <div>
          <label
            htmlFor='email'
            className='text-base font-medium text-gray-900 block mb-2'
          >
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
            placeholder='name@company.com'
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='text-base font-medium text-gray-900 block mb-2'
          >
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='••••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
          />
        </div>
        <div>
          <label
            htmlFor='confirm-password'
            className='text-sm font-medium text-gray-900 block mb-2'
          >
            Confirm password
          </label>
          <input
            type='password'
            name='confirm-password'
            id='confirm-password'
            placeholder='••••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
          />
        </div>
        <div className='flex items-start'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
              aria-describedby='remember'
              name='remember'
              type='checkbox'
              className='bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded'
            />
          </div>
          <div className='text-sm ml-3'>
            <label htmlFor='remember' className='font-medium text-gray-900'>
              I accept the&nbsp;
              <Link href='#' className='text-teal-500 hover:underline'>
                Terms and Conditions
              </Link>
            </label>
          </div>
        </div>
        <button
          type='submit'
          className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center'
        >
          Submit
        </button>
      </form>
    </>
  )
}

SignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
