import { FormEventHandler, ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { supabase } from '../../lib/supabase'

import Layout from '../../components/auth/layout'
import { RootError } from '../../components/RootError'

type FormValues = {
  password: string
  confirmPassword: string
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values,
    errors: {
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
              type: 'validate',
              message: 'Passwords do not match',
            },
          }
        : {}),
    },
  }
}

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({ resolver })

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  // Check for auth session when component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        // No session, redirect to sign in
        router.push('/auth/signin')
      }
    }

    checkSession()
  }, [router])

  const onSubmit: SubmitHandler<FormValues> = async ({ password }) => {
    setIsLoading(true)
    clearErrors()

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        throw error
      }

      setIsSuccess(true)

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    } catch (err: any) {
      console.error('Password reset error:', err)
      setError('root', {
        message: err?.message || 'Failed to reset password. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    reset()
    clearErrors()
  }

  if (isSuccess) {
    return (
      <div className='text-center'>
        <h3 className='text-2xl lg:text-3xl font-bold mb-4'>
          Password Reset Successful
        </h3>
        <p className='mb-6'>Your password has been successfully reset.</p>
        <p className='text-gray-600'>
          You will be redirected to the dashboard shortly...
        </p>
      </div>
    )
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
        <h3 className='grow text-2xl lg:text-3xl font-bold'>Reset Password</h3>
      </div>
      <p className='mt-2 text-gray-600 dark:text-gray-300'>
        Enter your new password below.
      </p>
      <form
        className='mt-8 space-y-6'
        action='#'
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}
      >
        <div>
          <label
            htmlFor='password'
            className='text-base font-medium block mb-2'
          >
            New Password
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
        <div>
          <label
            htmlFor='confirmPassword'
            className='text-base font-medium block mb-2'
          >
            Confirm New Password
          </label>
          {errors?.confirmPassword && (
            <div className='font-medium text-red-600'>
              {errors.confirmPassword.message}
            </div>
          )}
          <input
            type='password'
            {...register('confirmPassword')}
            placeholder='••••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
          />
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center disabled:bg-cyan-300'
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </>
  )
}

ResetPassword.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
