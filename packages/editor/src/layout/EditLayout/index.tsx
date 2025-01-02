/* 
* 编辑器布局
*/

import { lazy, Suspense, useState } from "react"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ConfigProvider, Splitter } from 'antd';
import SpinLoading from "@/components/SpinLoading";

const Menu = lazy(() => import("../Menu"))

const EditLayout = () => {
  const [sizes, setSizes] = useState<(number | string)[]>([320, window.innerWidth - 640, 320]);
  return (<DndProvider backend={HTML5Backend}>
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
                <Menu />
              </Suspense>
            </Splitter.Panel>
          </Splitter>
        </ConfigProvider>
    </div>
  </DndProvider>)
}


export default EditLayout