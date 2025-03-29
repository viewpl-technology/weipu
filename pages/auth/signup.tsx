// pages/auth/signup.tsx
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
  confirmPassword: string
  acceptTerms: boolean
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
        : values.password.length < 6
        ? {
            password: {
              type: 'minLength',
              message: 'Password must be at least 6 characters',
            },
          }
        : {}),
      ...(!values.confirmPassword
        ? {
            confirmPassword: {
              type: 'required',
              message: 'Confirm Password is required',
            },
          }
        : values.password !== values.confirmPassword
        ? {
            confirmPassword: {
              type: 'invalid',
              message: 'Confirm Password is not same as Password',
            },
          }
        : {}),
      ...(!values.acceptTerms
        ? {
            acceptTerms: {
              type: 'required',
              message: 'Accept Terms is required',
            },
          }
        : {}),
    },
  }
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({ resolver })

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const callbackUrl = (router.query.callbackUrl as string) || '/dashboard'

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    setIsLoading(true)
    clearErrors()

    try {
      // Sign up with Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      if (data?.user) {
        // Check if email confirmation is required
        if (data.user.identities?.length === 0) {
          // User exists but needs to confirm email
          router.push('/auth/verify-email?email=' + encodeURIComponent(email))
        } else {
          // Auto sign-in successful, redirect to dashboard
          router.push(callbackUrl)
        }
      }
    } catch (err: any) {
      console.error('Signup error:', err)
      const errorMessage =
        err?.message || 'An error occurred during sign up. Please try again.'
      setError('root', { message: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    reset()
    clearErrors()
  }

  return (
    <>
      {errors?.root && (
        <RootError
          error={errors.root.message ?? ''}
          clearErrors={clearErrors}
        />
      )}
      <div className='flex items-end'>
        <h2 className='grow text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white'>
          Sign up
        </h2>
        <div className='text-sm font-medium text-gray-500'>
          Already have an account?&nbsp;
          <Link href='/auth/signin' className='text-teal-500 hover:underline'>
            Sign in
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
            className='text-base font-medium text-gray-900 dark:text-white block mb-2'
          >
            Email
          </label>
          {errors?.email && (
            <div className='font-medium text-red-600'>
              {errors.email.message}
            </div>
          )}
          <input
            {...register('email')}
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
            placeholder='name@company.com'
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='text-base font-medium text-gray-900 dark:text-white block mb-2'
          >
            Password
          </label>
          {errors?.password && (
            <div className='font-medium text-red-600'>
              {errors.password.message}
            </div>
          )}
          <input
            {...register('password')}
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
            className='text-sm font-medium text-gray-900 dark:text-white block mb-2'
          >
            Confirm Password
          </label>
          {errors?.confirmPassword && (
            <div className='font-medium text-red-600'>
              {errors.confirmPassword.message}
            </div>
          )}
          <input
            {...register('confirmPassword')}
            type='password'
            id='confirm-password'
            placeholder='••••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
          />
        </div>
        <div>
          {errors?.acceptTerms && (
            <div className='font-medium text-red-600'>
              {errors.acceptTerms.message}
            </div>
          )}
          <div className='flex items-start'>
            <div className='flex items-center h-5'>
              <input
                {...register('acceptTerms')}
                id='acceptTerms'
                aria-describedby='acceptTerms'
                name='acceptTerms'
                type='checkbox'
                className='bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded'
              />
            </div>
            <div className='text-sm ml-3'>
              <label
                htmlFor='acceptTerms'
                className='font-medium text-gray-900 dark:text-white'
              >
                I accept the&nbsp;
                <Link href='#' className='text-teal-500 hover:underline'>
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>
        </div>
        <div className='flex gap-4'>
          <button
            type='submit'
            disabled={isLoading}
            className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center disabled:bg-cyan-300'
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
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
  )
}

SignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
