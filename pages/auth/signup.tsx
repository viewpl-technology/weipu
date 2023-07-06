import { FormEventHandler, ReactElement } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'
import { createCaptcha } from '@viewpl-technology/svg-captcha'
import { setup } from '../../lib/csrf'
import { client } from '../../lib/client'

import Layout from '../../components/auth/layout'
import { SvgCaptcha } from '../../components/SvgCaptcha'
import { RootError } from '../../components/RootError'

type FormValues = {
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  captcha: string
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
      ...(!values.captcha
        ? {
            captcha: {
              type: 'required',
              message: 'CAPTCHA is required',
            },
          }
        : {}),
    },
  }
}

type Props = {
  captcha: string
}

export default function SignUp({ captcha }: Props) {
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
  const onSubmit: SubmitHandler<FormValues> = async ({
    email,
    password,
    captcha,
  }) => {
    client('/api/users/create', { body: { email, password, captcha } })
      .then((res) => {
        signIn('credentials', {
          username: email,
          password,
          redirect: false,
          callbackUrl,
        })
          .then((res) => {
            router.push(callbackUrl)
          })
          .catch((err) => {
            setError('root', { message: 'Failed to sign in automatically' })
            console.error(err)
          })
      })
      .catch((err) => {
        setError('root', {
          message: 'Failed to sign up due to error: ' + err,
        })
      })
  }

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    reset()
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
        <div>
          <label
            htmlFor='captcha'
            className='text-base font-medium text-gray-900 dark:text-white block mb-2'
          >
            CAPTCHA
          </label>
          <SvgCaptcha className='w-150 w-px' svgHtmlRaw={captcha} />
        </div>
        <div>
          {errors?.captcha && (
            <div className='font-medium text-red-600'>
              {errors.captcha.message}
            </div>
          )}
          <input
            {...register('captcha')}
            type='text'
            id='captcha'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
          />
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

SignUp.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export const getServerSideProps = setup(async (req, res) => {
  const setCookies = res.getHeader('set-cookie')
  if (Array.isArray(setCookies)) {
    const csrfCookie = setCookies.find((item) => item.includes('csrfSecret'))
    if (csrfCookie) {
      const csrf = csrfCookie
        .split(';')
        .map((x) => x.split('='))
        .find((x) => x[0] == 'csrfSecret')
      if (csrf) {
        const captcha = createCaptcha(csrf[1].substring(0, 4), {
          noise: 2,
          background: '#F3F4F6', // gray-100
        })

        return { props: { captcha } }
      }
    }
  }
  return { props: {} }
})
