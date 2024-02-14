import { useState } from 'react'
import { SegmentedControl, Text } from '@mantine/core'
import {
  IconShoppingCart,
  IconMessage2,
  IconBellRinging,
  Icon2fa,
  IconUsers,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconBrandProducthunt,
  IconDashboard,
} from '@tabler/icons-react'
import classes from './NavbarSegmented.module.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { logout } from '../../../api/user_service_api'

const tabs = {
  account: [
    { link: '/notifications', label: 'Notifications', icon: IconBellRinging },
    { link: '/billing', label: 'Billing', icon: IconReceipt2 },
    { link: '/authentication', label: 'Authentication', icon: Icon2fa },
  ],
  general: [
    { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
    { link: '/orders', label: 'Orders', icon: IconShoppingCart },
    { link: '/products', label: 'Products', icon: IconBrandProducthunt },
    { link: '/reviews', label: 'Reviews', icon: IconMessage2 },
    { link: '/customers', label: 'Customers', icon: IconUsers },
    { link: '/refunds', label: 'Refunds', icon: IconReceiptRefund },
  ],
}

export function NavbarSegmented() {
  const [section, setSection] = useState<'account' | 'general'>('general')
  const [active, setActive] = useState('Billing')
  const { user, isAuthenticated } = useAuth()

  const handleLogout = async () => {
    await logout()
    await isAuthenticated()
  }

  const links = tabs[section].map((item) => (
    <Link
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <nav className={classes.navbar}>
      <div>
        <Text fw={500} size="md" className={classes.title} mb="xs">
          Addis Fashion Shopping
        </Text>

        <SegmentedControl
          value={section}
          onChange={(value: string) =>
            setSection(value as 'account' | 'general')
          }
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: 'System', value: 'general' },
            { label: 'Account', value: 'account' },
          ]}
        />
      </div>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        {user ? (
          <Link
            to="/logout"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span onClick={handleLogout}>Logout</span>
          </Link>
        ) : (
          <div>
            <Link to={'/login'} className={classes.link}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Login</span>
            </Link>
            <Link to="/register" className={classes.link}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Register</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
