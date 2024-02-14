import React, { useState } from 'react'
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Loader,
} from '@mantine/core'
import classes from './registrationForm.module.css'
import useApi from '../../../../hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { registerUser } from '../../../../api/user_service_api'

export function RegistrationForm() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, loading, makeRequest } = useApi({
    onSuccess: async () => {
      await isAuthenticated()
      navigate('/login')
    },
  })

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await makeRequest(() =>
      registerUser({ firstName, lastName, email, password }),
    )
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Create an Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={() => navigate('/login')}>
          Log in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => handleRegistration(e)}>
          <TextInput
            label="First Name"
            placeholder="John"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
            mt="md"
          />
          <TextInput
            label="Email"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            mt="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            {/* Additional registration info */}
          </Group>

          {error &&
            error.map((err, index) => (
              <div
                key={index}
                style={{ color: 'red', fontSize: '14px', marginTop: '20px' }}
              >
                {err.message}
              </div>
            ))}
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <Loader size={32} color="blue" />
            </div>
          ) : (
            <Button fullWidth mt="xl" type="submit">
              Register
            </Button>
          )}
        </form>
      </Paper>
    </Container>
  )
}
