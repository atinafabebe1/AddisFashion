import React from 'react'
import Image from 'next/image'
import logo from '../../../../public/logo_rev.svg'
import Link from 'next/link'
import LoginForm from '@/components/auth/login/LoginForm'

const LoginPage: React.FC = () => (
  <section className="bg-gradient-to-r from-gray-100 to-gray-200 dark:bg-gray-900 dark:border-gray-700 min-h-screen flex items-center justify-center">
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 dark:bg-gray-800 dark:border-gray-700">
      <Link href="/">
        <div className="flex items-center justify-center mb-6">
          <Image src={logo} alt="Company Logo" width={220} height={120} />
        </div>
      </Link>
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold leading-tight text-indigo-800 dark:text-white">
          Login
        </h1>
        <LoginForm />
      </div>
    </div>
  </section>
)

export default LoginPage
