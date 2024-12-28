import { Layout, Spin, Form, Row, Col, Empty, Button, Pagination } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAntdTable } from 'ahooks'
import { getProjectList } from '@/services/api/projects'
import SearchBar from '@/components/SearchBar'
import ProjectCard from '@/components/Card/ProjectCard'
import { PlusOutlined } from '@ant-design/icons'
import CreateProject from '@/components/CreateProject'

interface TableParams {
  current: number
  pageSize: number
}

interface FilterParams {
  keyword?: string
}

export default function Projects() {
  const [form] = Form.useForm()
  // const [loading, setLoading] = useState(false)
  // const [current, setCurrent] = useState(1)
  // const [pageSize, setPageSize] = useState(10)
  // const [total, setTotal] = useState(0)
  // const [projectList, setProjectList] = useState<ProjectItem[]>([])
  const [type, setType] = useState('project')
  const createProjectRef = useRef<{ open: (type: string) => void }>()
  const navigate = useNavigate()

  // 加载项目列表
  // const loadProjectList = async (
  //   pageNum: number = current,
  //   size: number = pageSize,
  // ) => {
  //   try {
  //     setLoading(true)
  //     const { type, keyword } = form.getFieldsValue()
  //     const res = await getProjectList({
  //       pageNum,
  //       pageSize: size,
  //       keyword,
  //       type,
  //     })
  //     setLoading(false)
  //     setProjectList(res?.list || [])
  //     setTotal(res?.total || 0)
  //   } catch (error) {
  //     setLoading(false)
  //   }
  // }
  const getTableData = (
    { current, pageSize }: TableParams,
    { keyword }: FilterParams,
  ) => {
    return getProjectList({
      pageNum: current,
      pageSize: pageSize,
      keyword,
    }).then((res) => {
      return {
        total: res?.total || 0,
        list: res?.list || [],
      }
    })
  }

  const { tableProps, loading, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10,
  })

  // 新建项目或页面
  const handleCreate = () => {
    createProjectRef.current?.open(type)
  }

  // useEffect(() => {
  //   loadProjectList(current, pageSize)
  // }, [current, pageSize])

  return (
    <Layout.Content className="h-[calc(100vh - 64px)] flex flex-col overflow-auto px-5 py-7">
      <SearchBar
        form={form}
        from={'项目'}
        submit={search.submit}
        refresh={search.submit}
        onCreate={handleCreate}
      />
      <Spin spinning={loading} size="large" tip="加载中...">
        {tableProps.dataSource && tableProps.dataSource.length > 0 ? (
          <ProjectCard list={tableProps.dataSource} />
        ) : (
          <Empty className="mt-2.5">
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleCreate}
            >
              创建项目
            </Button>
          </Empty>
        )}
      </Spin>

      {tableProps.dataSource && tableProps.dataSource.length > 0 && (
        <Pagination
          className="mt-2.5"
          {...tableProps.pagination}
          showSizeChanger
          showTotal={(total) => `总共 ${total} 条`}
          onChange={(current, pageSize) =>
            tableProps.onChange({ current, pageSize })
          }
        />
      )}

      {/* 新建项目 */}
      <CreateProject createRef={createProjectRef} update={search.submit} />
    </Layout.Content>
  )
}
