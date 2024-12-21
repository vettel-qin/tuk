import React, { Suspense } from 'react'
import { Spin } from 'antd'

/**
 * 懒加载组件
 * @param Component 组合对象
 * @returns 返回新的组件
 */

export const LazyLoad = (
  Component: React.FC,
  isEditor?: boolean,
): React.ReactNode => (
  <Suspense
    fallback={
      isEditor ? (
        <Spin size="large" className="mt-8 flex items-center justify-center" />
      ) : null
    }
  >
    <Component />
  </Suspense>
)
