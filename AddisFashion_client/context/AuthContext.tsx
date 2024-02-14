import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { currentUser } from '../api/user_service_api'

type AuthContextType = {
  user: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string>('')

  useEffect(() => {
    checkAuthentication()
  }, [])

  const login = async (username: string, password: string) => {
    setUser(username)
  }

  const logout = () => {
    setUser('')
  }

  const isAuthenticated = async (): Promise<boolean> => {
    try {
      const response = await currentUser()
      console.log(response.currentUser.email)
      setUser(response.currentUser.email)
      return true
    } catch (error) {
      console.error('Error checking authentication status:', error)
      return false
    }
  }

  const checkAuthentication = async () => {
    await isAuthenticated()
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
