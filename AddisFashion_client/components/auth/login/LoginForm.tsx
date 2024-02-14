'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import InputField from '@/components/form/input'
import Link from 'next/link'
import CustomButton from '@/components/CustomButton'
import { login } from '../../../api/user_service_api'
import { useRouter } from 'next/navigation'
import useApi from '@/hooks/useApi'

interface FormData {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const { data, error, loading, makeRequest } = useApi({
    onSuccess: () => {
      router.push('/')
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    makeRequest(() => login(formData))
    if (data) {
      router.push('/')
    }
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <InputField
        label="Your email"
        type="email"
        id="email"
        placeholder="name@gmail.com"
        required
        onChange={handleChange}
      />
      <InputField
        label="Password"
        type="password"
        id="password"
        placeholder="••••••••"
        required
        onChange={handleChange}
      />

      {error && (
        <p className="text-red-500 text-sm">Invalid email or password.</p>
      )}

      <CustomButton
        title="Login"
        containerStyles="w-full text-white bg-primary hover:bg-primary-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        handleClick={() => {
          handleSubmit
        }}
        btnType={'submit'}
        // disabled={loading}
      />

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <Link href="/auth/register">
          <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
            Sign up here
          </span>
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
