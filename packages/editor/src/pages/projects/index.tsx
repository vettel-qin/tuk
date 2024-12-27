import { Layout, Spin, Form, Row, Col } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjectList } from '@/services/api/projects'
import { ProjectItem } from '@/types/projects'
import styles from './index.module.less'

export default function Projects() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [projectList, setProjectList] = useState<ProjectItem[]>([])
  const navigate = useNavigate()

  // 加载项目列表
  const loadProjectList = async (
    pageNum: number = current,
    size: number = pageSize,
  ) => {
    try {
      setLoading(true)
      const { type, keyword } = form.getFieldsValue()
      const res = await getProjectList({
        pageNum,
        pageSize: size,
        keyword,
        type,
      })
      setLoading(false)
      setProjectList(res?.list || [])
      setTotal(res?.total || 0)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjectList(current, pageSize)
  }, [current, pageSize])

  return (
    <Layout.Content className={styles.project}>
      {/* <SearchBar
        form={form}
        from="项目"
        refresh={loadProjectList}
        onCreate={() => navigate('/project/0/config')}
      /> */}
      {total > 0 || loading ? (
        <div className="flex-1">
          <Spin spinning={loading} size="large" tip="加载中...">
            <Row gutter={[16, 16]}>
              {projectList.map((item: ProjectItem, index) => (
                <Col span={8} key={item.id || index}>
                  {item.name}
                </Col>
              ))}
            </Row>
          </Spin>
        </div>
      ) : (
        <div className={styles.empty}>暂无数据</div>
      )}
    </Layout.Content>
  )
}
