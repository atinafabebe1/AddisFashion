import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavbarSegmented } from './components/common/navbar/NavbarSegmented'
import Products from './pages/Products/Products'
import ProductNew from './pages/Products/ProductNew'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/Registerpage'
import Dashboard from './pages/Dashboard/dashboard'
import { NotFoundPage } from './pages/404/NotFoundPage'
import { useEffect } from 'react'

const AuthenticatedApp = () => {
  return (
    <div style={{ display: 'flex' }}>
      <NavbarSegmented />
      <div
        style={{
          marginLeft: '300px',
          padding: 'var(--mantine-spacing-md)',
          width: 'calc(100%)',
        }}
      >
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/product/new" element={<ProductNew />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

function App() {
  const { user } = useAuth()
  useEffect(() => {
    console.log(user)
  })

  return <Router>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</Router>
}

export default App
