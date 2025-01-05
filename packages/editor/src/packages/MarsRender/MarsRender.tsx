import { memo, useState, useEffect, Suspense } from 'react'
import { Spin } from 'antd'
import { getComponent } from '@/packages'
/**
 * 编辑器用于生成组件
 * @param elements 模板所有组件对象
 * @param form 只有Form组件会传递form对象，用于子表单更新数据
 * @returns
 */

const MarsRender = memo(({ elements = [] }: { elements: any[] }) => {
  return (
    <>
      {elements.map((item) => {
        if (!item) return <></>
        return <Material item={item} key={item.id}></Material>
      })}
    </>
  )
})

export const Material = memo(({ item }: { item: any }) => {
  const [Component, setComponent] = useState<any>(null)
  const [config, setConfig] = useState<any>({})
  useEffect(() => {
    setComponent(getComponent(item.type))
  }, [])
  if (Component) {
    console.log(Component, '11111Component')

    return (
      <Suspense fallback={<Spin size="default"></Spin>}>
        <Component
          id={item.id}
          type={item.type}
          config={{ ...config, props: {} }}
          elements={item.elements || []}
          // 把事件函数传递给子组件，子组件触发对应事件时，会执行回调函数
          // {...createEvents()}
          // ref={(ref: any) => setComponentRef(item.id, ref)}
        />
      </Suspense>
    )
  }

  return null
})

export default MarsRender
