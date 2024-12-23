import { useEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import Header from '@/layout/Header'
import { useUserActionStore, UserInfoStore } from '@/stores/userStore'

export default function Root() {
  const loaderData = useLoaderData()
  const setUserInfo = useUserActionStore()

  useEffect(() => {
    if (!loaderData) return
    setUserInfo(loaderData as UserInfoStore)
  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
