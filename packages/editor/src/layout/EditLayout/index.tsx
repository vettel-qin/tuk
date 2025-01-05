/*
 * 编辑器布局
 */

import { lazy, Suspense, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ConfigProvider, Splitter } from 'antd'
import { Outlet } from 'react-router-dom'
import SpinLoading from '@/components/SpinLoading'
import ConfigPanel from '../components/ConfigPanel'

const Menu = lazy(() => import('../Menu'))

const EditLayout = () => {
  const [sizes, setSizes] = useState<(number | string)[]>([320, window.innerWidth - 640, 320])
  return (
    <DndProvider backend={HTML5Backend}>
      {/* 创建拖拽容器 */}
      {/* 编辑器 */}
      <div style={{ height: 'calc(100vh - 64px)' }}>
        <ConfigProvider
          theme={{
            components: {
              Splitter: {
                colorFill: '#e8e9eb',
                controlItemBgActive: '#7d33ff',
                controlItemBgActiveHover: '#7d33ff',
              },
            },
          }}
        >
          <Splitter onResize={setSizes}>
            <Splitter.Panel collapsible size={sizes[0]} min={320}>
              <Suspense fallback={<SpinLoading />}>
                <Menu /> {/** 菜单 */}
              </Suspense>
            </Splitter.Panel>
            <Splitter.Panel size={sizes[1]}>
              <Outlet></Outlet> {/** 编辑器 */}
            </Splitter.Panel>
            <Splitter.Panel collapsible size={sizes[2]} min={320}>
              <Suspense fallback={<SpinLoading />}>
                <ConfigPanel /> {/** 配置面板 */}
              </Suspense>
            </Splitter.Panel>
          </Splitter>
        </ConfigProvider>
      </div>
    </DndProvider>
  )
}

export default EditLayout
