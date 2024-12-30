import React, { useEffect, useState } from 'react'
import { createBrowserRouter, useRouteError } from 'react-router-dom'
import { Button } from 'antd'
import { LazyLoad } from './LazyLoad'
import AuthLoader from './AuthLoader'
import Root from './Root'

/**
 * 渲染错误边界组件
 */
function ErrorBoundary() {
  const [logId, setLogId] = useState('')
  const error: any = useRouteError()

  useEffect(() => {
    const backUpId = 'Key' + Date.now()
    setLogId(backUpId)
  }, [])

  return (
    <div className="mx-auto my-[100px] w-4/5">
      <h1>{error.name}：渲染失败，请检查:</h1>
      <h3 className="leading-8">
        当前页面数据已为您备份, 可通过sessionStorage查找, 日志Id: {logId}
      </h3>
      <p style={{ lineHeight: '30px', color: 'red', marginBottom: 20 }}>
        {error.stack}
      </p>
      <Button type="primary" onClick={() => location.reload()}>
        Try again
      </Button>
    </div>
  )
}

export const router = [
  {
    path: '/',
    element: LazyLoad(React.lazy(() => import('@/pages/welcome/index'))),
  },
  {
    path: '/login',
    element: LazyLoad(React.lazy(() => import('@/pages/login/index'))),
  },
  {
    path: '/',
    loader: AuthLoader,
    element: <Root />,
    errorBoundary: <ErrorBoundary />,
    children: [
      {
        path: '/projects',
        element: LazyLoad(React.lazy(() => import('@/pages/projects/index'))),
      },
      {
        path: '/project/:id',
        element: LazyLoad(React.lazy(() => import('@/pages/admin/admin'))),
        children: [
          {
            path: '/project/:id/config',
            element: LazyLoad(
              React.lazy(() => import('@/pages/admin/config/index')),
            ),
          },
        ],
      },
      {
        path: '/pages',
        element: LazyLoad(React.lazy(() => import('@/pages/pages/index'))),
      },
    ],
  },
]

export default createBrowserRouter(router)
