'use client'
import React, { useEffect, useState } from 'react'
import EditProfile from '@/components/Accounts/EditProfile'
import Dashboard from './Dashboard'
import MyOrders from './MyOrders'

const Account = () => {
  const [isDashboard, setDashboard] = useState(false)
  const [isOrders, setOrders] = useState(false)
  const [isInfo, setInfo] = useState(false)
  const handleDashboardOpen = () => {
    setDashboard(true)
    setOrders(false)
    setInfo(false)
  }
  const handleOrders = () => {
    setOrders(true)
    setDashboard(false)
    setInfo(false)
  }
  const handleInfo = () => {
    setInfo(true)
    setDashboard(false)
    setOrders(false)
  }
  useEffect(() => {
    setDashboard(true)
  }, [])
  return (
    <div className="w-full flex">
      <div className="w-1/3 border-r-2 border-gray-600  flex flex-col justify-between items-center">
        <div className="h-[470px] flex flex-col w-2/3 gap-4  text-xl font-semibold">
          <div
            className="pl-10 cursor-pointer rounded-lg hover:bg-slate-200 py-5"
            onClick={handleDashboardOpen}
          >
            <p>Dashboard</p>
          </div>
          <div
            className="pl-10 rounded-lg items-center cursor-pointer hover:bg-slate-200 py-5"
            onClick={handleOrders}
          >
            <p>My Orders</p>
          </div>
          <div
            className="pl-10 rounded-lg cursor-pointer hover:bg-slate-200 py-5"
            onClick={handleInfo}
          >
            <p>My Info</p>
          </div>
        </div>
      </div>
      <div className="w-2/3">
        {isInfo && <EditProfile userId={''} />}
        {isOrders && <MyOrders />}
        {isDashboard && <Dashboard />}
      </div>
    </div>
  )
}
export default Account
