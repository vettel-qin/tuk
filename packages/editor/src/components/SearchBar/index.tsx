import { memo } from 'react'
import { Button, Form, Input, Space, Tooltip } from 'antd'
import {
  ArrowLeftOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

export interface SearchBarProps {
  form: any
  from: any
  submit: any
  refresh?: any
  onCreate: any
}

const SearchBar = memo((props: SearchBarProps) => {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const { form, from, submit, refresh, onCreate } = props
  return (
    <div className="mb-5 flex items-center justify-between rounded-md">
      <div className="flex items-center">
        <Form form={form} layout="inline" initialValues={{ type: 1 }}>
          <Form.Item name="keyword" style={{ width: 200 }}>
            <Input
              placeholder={`请输入${from}名称/关键字`}
              allowClear
              onPressEnter={submit}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" size="middle" onClick={submit}>
                搜索
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <Space>
        {pathname === '/projects/pages' && (
          <Tooltip title="返回">
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => nav('/projects')}
            ></Button>
          </Tooltip>
        )}
        <Button
          type="primary"
          size="middle"
          icon={<PlusOutlined />}
          onClick={onCreate}
        >
          新建{from}
        </Button>
        {refresh && (
          <Button
            type="primary"
            size="middle"
            icon={<RedoOutlined />}
            onClick={refresh}
          >
            刷新
          </Button>
        )}
      </Space>
    </div>
  )
})

export default SearchBar
