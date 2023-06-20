import { FormEventHandler, ReactElement } from 'react'
import Link from 'next/link'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import Layout from '../../components/auth/layout'

type FormValues = {
  email: string
  password: string
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values,
    errors: {
      ...(!values.email
        ? {
            email: {
              type: 'required',
              message: 'Email is required',
            },
          }
        : {}),
      ...(!values.password
        ? {
            password: {
              type: 'required',
              message: 'Password is required',
            },
          }
        : {}),
    },
  }
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver })
  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => {
    signIn('credentials', { username: email, password })
  }

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    reset()
  }

  return (
    <>
      <div className='flex items-end'>
        <h3 className='grow text-2xl lg:text-3xl font-bold text-gray-900'>
          Sign in
        </h3>
        <div className='text-sm font-medium text-gray-500'>
          Not registered?&nbsp;
          <Link href='/auth/signup' className='text-teal-500 hover:underline'>
            Sign up
          </Link>
        </div>
      </div>
      <form
        className='mt-8 space-y-6'
        action='/api/auth/callback/credentials'
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}
      >
        <div>
          <label
            htmlFor='email'
            className='text-base font-medium text-gray-900 block mb-2'
          >
            Email
          </label>
          {errors?.email && (
            <div className='font-medium text-red-600'>
              {errors.email.message}
            </div>
          )}
          <input
            type='email'
            {...register('email')}
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
          {errors?.password && (
            <div className='font-medium text-red-600'>
              {errors.password.message}
            </div>
          )}
          <input
            type='password'
            {...register('password')}
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
              Remember me
            </label>
          </div>
          <a href='#' className='text-sm text-teal-500 hover:underline ml-auto'>
            Forgot password
          </a>
        </div>
        <button
          type='submit'
          className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center'
        >
          Submit
        </button>
        &nbsp;
        <button
          type='reset'
          className='text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center'
        >
          Reset
        </button>
      </form>
    </>
  )
}

SignIn.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
