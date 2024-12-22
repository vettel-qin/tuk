/**
 * 编辑器顶部组件
 */

import { Layout, Menu, MenuProps } from 'antd'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ProjectOutlined,
  OneToOneOutlined,
  CaretDownFilled,
  DownOutlined,
  AppstoreOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { Navigate } from 'react-router-dom'

const Header = memo(() => {
  const [isNav, setIsNav] = useState(false)
  const [navKey, setNavKey] = useState(['projects'])
  const navigate = useNavigate()
  // Tab 切换项
  const tabList: MenuProps['items'] = [
    {
      label: '项目列表',
      key: 'projects',
      icon: <ProjectOutlined style={{ fontSize: 16 }} />,
    },
    {
      label: '页面列表',
      key: 'pages',
      icon: <OneToOneOutlined style={{ fontSize: 16 }} />,
    },
    {
      label: '组件库',
      key: 'libs',
      icon: <AppstoreOutlined style={{ fontSize: 16 }} />,
    },
  ]

  // Tab切换点击
  const handleTab: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`)
  }

  return (
    <Layout.Header
      className={`flex h-16 items-center justify-between gap-y-8 border-b-[1px] border-[#e8e9eb] bg-white px-5 py-0 text-sm leading-[64px]`}
    >
      <div className="flex w-[300px] cursor-pointer items-center gap-y-[10px] text-xl">
        <span>Tuk</span>
      </div>
      <div className="flex-1">
        <Menu
          mode="horizontal"
          items={tabList}
          onClick={handleTab}
          selectedKeys={navKey}
        />
      </div>
    </Layout.Header>
  )
})

export default Header
