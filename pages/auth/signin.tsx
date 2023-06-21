import { FormEventHandler, ReactElement } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'

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
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({ resolver })

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const result = await signIn('credentials', {
      username: email,
      password,
      redirect: false,
      callbackUrl,
    })

    if (result && result.ok) {
      router.push(callbackUrl)
    } else {
      setError('root', { message: 'Failed to sign in' })
    }
  }

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    reset()
  }

  function RootError({ error }: { error: string }) {
    return (
      <div
        id='alert-2'
        className='flex p-4 mb-4 text-red-800 rounded-lg bg-red-50'
        role='alert'
      >
        <svg
          aria-hidden='true'
          className='flex-shrink-0 w-5 h-5'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
            clip-rule='evenodd'
          ></path>
        </svg>
        <span className='sr-only'>Info</span>
        <div className='ml-3 text-sm font-medium'>{error}</div>
        <button
          type='button'
          className='ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8'
          data-dismiss-target='#alert-2'
          aria-label='Close'
          onClick={() => clearErrors('root')}
        >
          <span className='sr-only'>Close</span>
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clip-rule='evenodd'
            ></path>
          </svg>
        </button>
      </div>
    )
  }

  return (
    <>
      {errors?.root && <RootError error={errors.root.message ?? ''} />}
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
