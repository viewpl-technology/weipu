import { FormEventHandler, ReactElement, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { supabase } from '../../lib/supabase'

import Layout from '../../components/auth/layout'
import { RootError } from '../../components/RootError'

type FormValues = {
  email: string
  password: string
  rememberMe?: boolean
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

  const [isLoading, setIsLoading] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)

  const router = useRouter()
  const callbackUrl = (router.query.callbackUrl as string) || '/dashboard'

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    setIsLoading(true)
    clearErrors()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data?.session) {
        // Successful sign-in, redirect to the intended URL or dashboard
        router.push(callbackUrl)
      }
    } catch (err: any) {
      console.error('Sign in error:', err)
      const errorMessage =
        err?.message || 'Invalid email or password. Please try again.'
      setError('root', { message: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async () => {
    const email = document.getElementById('email') as HTMLInputElement
    if (!email.value) {
      setError('email', {
        type: 'required',
        message: 'Please enter your email to reset password',
      })
      return
    }

    setIsLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setResetEmailSent(true)
    } catch (err: any) {
      setError('root', {
        message:
          err?.message || 'Failed to send reset email. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    reset()
    clearErrors()
    setResetEmailSent(false)
  }

  return (
    <>
      {errors?.root && (
        <RootError
          error={errors.root.message ?? ''}
          clearErrors={clearErrors}
        />
      )}

      {resetEmailSent ? (
        <div className='text-center'>
          <h3 className='text-2xl lg:text-3xl font-bold mb-4'>
            Check your email
          </h3>
          <p className='mb-6'>
            We&apos;ve sent you a link to reset your password.
          </p>
          <button
            onClick={() => setResetEmailSent(false)}
            className='text-cyan-600 hover:text-cyan-700 font-medium'
          >
            Back to sign in
          </button>
        </div>
      ) : (
        <>
          <div className='flex items-end'>
            <h3 className='grow text-2xl lg:text-3xl font-bold'>Sign in</h3>
            <div className='text-sm font-medium text-gray-500'>
              Not registered?&nbsp;
              <Link
                href='/auth/signup'
                className='text-teal-500 hover:underline'
              >
                Sign up
              </Link>
            </div>
          </div>
          <form
            className='mt-8 space-y-6'
            action='#'
            onSubmit={handleSubmit(onSubmit)}
            onReset={onReset}
          >
            <div>
              <label
                htmlFor='email'
                className='text-base font-medium block mb-2'
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
                id='email'
                {...register('email')}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                placeholder='name@company.com'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='text-base font-medium block mb-2'
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
                  type='checkbox'
                  {...register('rememberMe')}
                  className='bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded'
                />
              </div>
              <div className='text-sm ml-3'>
                <label htmlFor='remember' className='font-medium'>
                  Remember me
                </label>
              </div>
              <button
                type='button'
                onClick={handleResetPassword}
                className='text-sm text-teal-500 hover:underline ml-auto'
              >
                Forgot password
              </button>
            </div>
            <div className='flex gap-4'>
              <button
                type='submit'
                disabled={isLoading}
                className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center disabled:bg-cyan-300'
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
              <button
                type='reset'
                className='text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center'
              >
                Reset
              </button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

SignIn.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
