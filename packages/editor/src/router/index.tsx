import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LazyLoad } from './LazyLoad'

export const router = [
  {
    path: '/',
    element: LazyLoad(React.lazy(() => import('@/pages/welcome/index'))),
  },
]

export default createBrowserRouter(router)