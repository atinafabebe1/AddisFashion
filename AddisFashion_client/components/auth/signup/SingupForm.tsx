'use client'
import React, { useState } from 'react'
import InputField from '@/components/form/input'
import Checkbox from '@/components/form/checkbox'
import Link from 'next/link'
import axios from 'axios'
import CustomButton from '@/components/CustomButton' // Update the path accordingly
import { BASE_URL } from '../../../api/user_service_api'

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  const [passwordMatchError, setPasswordMatchError] = useState(false)
  const [noAcceptTerms, setNoAcceptTerms] = useState(false)

  const handleChange = ({
    target: { name, value, type, checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Check if passwords match
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMatchError(
        name === 'password' && formData.confirmPassword !== value,
      )
    }
  }

  const handleChangeAcceptTerms = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      acceptTerms: event.target.checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true)
      return
    }
    console.log(formData.acceptTerms)

    if (!formData.acceptTerms) {
      setNoAcceptTerms(true)
      return
    }

    try {
      const { email, password } = formData
      await axios.post(`${BASE_URL}/register`, {
        email,
        password,
      })
      // Handle success
    } catch (error) {
      // Handle error
      console.error('Registration failed:', error)
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
      <InputField
        label="Confirm password"
        type="password"
        id="confirmPassword"
        placeholder="••••••••"
        required
        onChange={handleChange}
      />
      {passwordMatchError && (
        <p className="text-red-500 text-sm">Passwords do not match.</p>
      )}
      <Checkbox
        label="I accept the Terms and Conditions"
        id="acceptTerms"
        onChange={handleChangeAcceptTerms}
      />
      {noAcceptTerms && (
        <p className="text-red-500 text-sm">
          Please accept terms and conditions.
        </p>
      )}
      <CustomButton
        title="Create an account"
        containerStyles="w-full text-white bg-primary-blue hover:bg-primary-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        handleClick={() => handleSubmit}
        btnType={'submit'}
      />

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/auth/login">
          <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
            Login here
          </span>
        </Link>
      </p>
    </form>
  )
}

export default SignUpForm
