import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return (
    <ConfigProvider
      theme={{
        cssVar: true, // 开启 CSS 变量
        hashed: false, // 关闭 hash
        token: {
          // 自定义主题
          colorPrimary: '#52c41a',
          colorLink: '#52c41a',
          colorInfo: '#52c41a',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
