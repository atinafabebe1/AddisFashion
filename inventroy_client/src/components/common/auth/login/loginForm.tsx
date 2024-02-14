import React, { useState } from 'react'
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Loader,
} from '@mantine/core'
import classes from './loginform.module.css'
import useApi from '../../../../hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { login } from '../../../../api/user_service_api'

export function LoginForm() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, loading, makeRequest } = useApi({
    onSuccess: async () => {
      await isAuthenticated()
      navigate('/dashboard')
    },
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await makeRequest(() => login({ email, password }))
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate('/register')}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => handleLogin(e)}>
          <TextInput
            label="Email"
            placeholder="abebe@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
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
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
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
              Sign in
            </Button>
          )}
        </form>
      </Paper>
    </Container>
  )
}
