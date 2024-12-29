/**
 * 项目配置
 */

import {
  Form,
  Input,
  Radio,
  Switch,
  Button,
  Space,
  Tag,
  Image,
  Modal,
} from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import { updateProject } from '@/services/api/projects'
import { message } from '@/utils/AntdGlobal'
import ColorPicker from '@/components/ColorPicker'
import { useParams, useNavigate } from 'react-router-dom'
import { RollbackOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { useUserInfoStore } from '@/stores/userStore'
import {
  PageMember,
  getMemberList,
  deletePageMember,
} from '@/services/api/pageMember'
import MemberSetting from '@/layout/Menu/Member/MemberSetting'
import UploadImages from '@/components/UploadImages'
import { getProjectDetail, delProject } from '@/services/api/projects'

const Config = memo(() => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<'detail' | 'edit' | 'create'>('detail')
  const [ownerId, setOwnerId] = useState(0)
  const [open, setOpen] = useState(false)
  const [delLoading, setDelLoading] = useState<boolean>(false)
  const userId = useUserInfoStore().userId
  const { id } = useParams()
  const navigate = useNavigate()

  // 项目加载
  useEffect(() => {
    if (!id) return
    getProjectDetail(parseInt(id)).then((res) => {
      form.setFieldsValue(res)
      setOwnerId(res?.userId || 0)
    })
  }, [])

  // 项目提交
  const handleSubmit = async () => {
    try {
      await form.validateFields()
      const { breadcrumb, tag, footer, ...rest } = form.getFieldsValue()
      setLoading(true)
      await updateProject({
        ...rest,
        tag: tag ? 1 : 0,
        footer: footer ? 1 : 0,
        breadcrumb: breadcrumb ? 1 : 0,
      })
      message.success('更新成功')
      setLoading(false)
      setType('detail')
    } catch (error) {
      setLoading(false)
    }
  }

  // 删除确认
  const handleDelConfirm = () => {
    setOpen(true)
  }
  // 删除提交
  const handleOk = async (val?: string) => {
    setDelLoading(true)
    try {
      await delProject({ id: Number(id), type: val })
      message.success('删除成功')
      navigate('/projects')
    } finally {
      setOpen(false)
      setDelLoading(false)
    }
  }

  // 属性设置：默认只读，编辑模式下可输入
  const props: {
    disabled: boolean
    variant: 'outlined' | 'borderless'
  } = {
    disabled: type === 'detail',
    variant: type === 'detail' ? 'borderless' : 'outlined',
  }

  return (
    <div className="container m-auto flex bg-white">
      <Form
        form={form}
        initialValues={{
          isPublic: 1,
          layout: 1,
          menuMode: 'inline',
          menuThemeColor: 'dark',
          systemThemeColor: '#52c41a',
          breadcrumb: true,
          tag: true,
          footer: false,
          logo: `/logo.jpg`,
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        size="middle"
        onFinish={handleSubmit}
        className="flex flex-1 flex-col"
      >
        <Form.Item label="项目ID" name={'id'} hidden>
          <Input />
        </Form.Item>
        <h3 className="mb-4 border-b border-[var(--tuk-theme-card-border-color)] pb-2.5 pl-5 pt-5 text-xl font-bold">
          基础配置
        </h3>
        <Form.Item
          label="项目名称"
          name="name"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input
            placeholder={'项目名称: Mars'}
            {...props}
            maxLength={15}
            showCount
          />
        </Form.Item>
        <Form.Item
          label="项目描述"
          name="remark"
          rules={[{ required: true, message: '请输入项目描述' }]}
        >
          <Input.TextArea
            placeholder={'请输入项目描述'}
            rows={3}
            maxLength={100}
            showCount={type !== 'detail'}
            {...props}
          />
        </Form.Item>
        <Form.Item
          label="LOGO"
          name="logo"
          rules={[{ required: true, message: '请上传项目Logo' }]}
        >
          {type === 'detail' ? <ImageFC /> : <UploadImages />}
        </Form.Item>
        <h3 className="mb-4 border-b border-[var(--tuk-theme-card-border-color)] pb-2.5 pl-5 pt-5 text-xl font-bold">
          系统配置
        </h3>
        <Form.Item label="系统布局" name="layout">
          <Radio.Group
            {...props}
            onChange={(event) =>
              form.setFieldValue(
                'menuMode',
                event.target.value === 1 ? 'inline' : 'horizontal',
              )
            }
          >
            <Radio value={1}>
              <img style={{ width: 100 }} src="/vertical.png" alt="左右布局" />
            </Radio>
            <Radio value={2}>
              <img
                style={{ width: 100 }}
                src="/horizontal.png"
                alt="上左右下布局"
              />
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {(form: any) => {
            const layout = form.getFieldValue('layout')
            return layout === 1 ? (
              <Form.Item label="菜单模式" name="menuMode">
                <Radio.Group {...props} buttonStyle="solid">
                  <Radio.Button value="vertical">垂直</Radio.Button>
                  <Radio.Button value="inline">内嵌</Radio.Button>
                </Radio.Group>
              </Form.Item>
            ) : (
              <Form.Item label="菜单模式" name="menuMode">
                <Radio.Group {...props} buttonStyle="solid">
                  <Radio.Button value="horizontal">水平</Radio.Button>
                </Radio.Group>
              </Form.Item>
            )
          }}
        </Form.Item>
        <Form.Item label="菜单主题" name="menuThemeColor">
          <Radio.Group {...props}>
            <Radio value="dark">深色</Radio>
            <Radio value="light">浅色</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="系统主题" name="systemThemeColor">
          <ColorPicker {...props} />
        </Form.Item>
        <Form.Item label="面包屑" name="breadcrumb" valuePropName="checked">
          <Switch {...props} />
        </Form.Item>
        <Form.Item label="多页签" name="tag" valuePropName="checked">
          <Switch {...props} />
        </Form.Item>
        <Form.Item label="页脚" name="footer" valuePropName="checked">
          <Switch {...props} />
        </Form.Item>
        <h3 className="mb-4 border-b border-[var(--tuk-theme-card-border-color)] pb-2.5 pl-5 pt-5 text-xl font-bold">
          权限配置
        </h3>
        <Form.Item
          label="访问权限"
          tooltip="项目访问权限"
          extra="公开项目所有人可访问；私有项目可通过RBAC分配菜单权限。"
          name="isPublic"
          rules={[{ required: true, message: '请输入项目描述' }]}
        >
          <Radio.Group {...props}>
            <Radio value={1}>公开</Radio>
            <Radio value={2}>私有</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="开发权限"
          tooltip="项目配置修改权限"
          extra="只有开发者才能修改当前项目配置。"
        >
          <Developer ownerId={ownerId} />
        </Form.Item>
      </Form>

      <div className="pr-5 pt-5">
        <Button
          danger
          type="primary"
          onClick={handleDelConfirm}
          loading={delLoading}
          disabled={ownerId !== userId}
          className="mr-5"
        >
          删除项目
        </Button>
        {type === 'detail' ? (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setType('edit')
              }}
            >
              编辑
            </Button>
            <Button
              icon={<RollbackOutlined />}
              onClick={() => navigate('/projects')}
            >
              返回
            </Button>
          </Space>
        ) : (
          <Space>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={loading}
              onClick={handleSubmit}
            >
              保存
            </Button>
            <Button
              icon={<RollbackOutlined />}
              onClick={() => setType('detail')}
            >
              取消
            </Button>
          </Space>
        )}
      </div>

      {/* 项目删除弹框 */}
      <Modal
        open={open}
        title="项目删除确认"
        centered
        onOk={() => handleOk()}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            关闭
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={delLoading}
            onClick={() => handleOk()}
          >
            仅删除项目
          </Button>,
          <Button
            key="link"
            type="primary"
            danger
            loading={delLoading}
            onClick={() => handleOk('all')}
          >
            删除所有数据
          </Button>,
        ]}
      >
        <p>1. 删除项目后，您将无法找回，请慎重操作！</p>
        <p>2. 仅删除项目会保留项目下页面列表。</p>
        <p>3. 删除所有数据，会彻底删除项目本身、菜单列表以及归属页面列表。</p>
      </Modal>
    </div>
  )
})

// 项目设置开发者
const Developer = ({ ownerId }: { ownerId: number }) => {
  const projectId = useParams().id as string
  const memberRef = useRef<{ open: (type: 1 | 2, projectId: number) => void }>()
  const [list, setList] = useState<PageMember[]>([])
  const userId = useUserInfoStore().userId

  // 开发者权限
  useEffect(() => {
    if (projectId == '0') return
    handleMemberList()
  }, [])

  // 获取用户列表
  const handleMemberList = async () => {
    const res = (await getMemberList({
      pageId: parseInt(projectId),
    })) as { list: PageMember[] }
    setList(res.list)
  }

  // 新增用户
  const handleAdd = () => {
    memberRef.current?.open(1, parseInt(projectId))
  }

  // 删除用户
  const handleDelete = async (id: number) => {
    await deletePageMember({ id })
    setList(list.filter((item) => item.id != id))
  }
  return (
    <>
      <Space>
        {list.map((item) => (
          <Tag
            key={item.id}
            color="green"
            closable={ownerId === userId || item.userId === userId}
            onClose={() => handleDelete(item.id)}
          >
            {item.userName}
          </Tag>
        ))}
      </Space>
      {userId == ownerId && (
        <Button type="link" onClick={handleAdd}>
          添加
        </Button>
      )}
      <MemberSetting ref={memberRef} update={handleMemberList} />
    </>
  )
}

// 图片渲染
const ImageFC = ({ value }: any) => {
  return <Image src={value} style={{ width: 100 }} />
}

export default Config
