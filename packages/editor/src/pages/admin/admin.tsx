import { Layout } from 'antd'
import SideMenu from './components/SideMenu'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
// import projectApi from '@/api/project';
// import styles from './index.module.less';
import { checkAuth } from '@/services/api/projects'
export default function Admin() {
  const { id } = useParams()
  const navigate = useNavigate()
  // 项目加载
  useEffect(() => {
    if (!id) return
    checkAuth({ id: Number(id) }).then((res) => {
      if (res) {
        navigate(res === '404' ? '/404' : '/403')
      }
    })
  }, [])
  return (
    <Layout>
      <Layout.Sider className="bg-white">
        <SideMenu />
      </Layout.Sider>
      <Layout.Content className="h-[calc(100vh - 64px)] overflow-auto bg-[var(--tuk-theme-bg-color)] p-5">
        <Outlet></Outlet>
      </Layout.Content>
    </Layout>
  )
}
