import React from 'react'
import Image from 'next/image'
import logo from '../../../../public/logo_rev.svg'
import SignUpForm from '@/components/auth/signup/SingupForm'
import Link from 'next/link'

const SignUpPage: React.FC = () => (
  <section className="bg-gradient-to-r from-gray-100 to-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <Link href="/">
          <span className="flex items-center justify-center mb-6 text-3xl font-extrabold text-indigo-800 dark:text-white">
            <Image src={logo} alt="Company Logo" width={220} height={120} />
          </span>
        </Link>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 m-auto">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-indigo-800 md:text-3xl dark:text-white">
            Create an Account
          </h1>
          <SignUpForm />
        </div>
      </div>
    </div>
  </section>
)

export default SignUpPage
