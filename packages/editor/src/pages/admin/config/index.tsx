/**
 * 项目配置
 */

import { Form, Input, Radio, Switch, Button, Space, Tag, Image } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import { updateProject } from '@/services/api/projects'
import { message } from '@/utils/AntdGlobal'
import ColorPicker from '@/components/ColorPicker'
import { useParams, useNavigate } from 'react-router-dom'
import { useUserInfoStore } from '@/stores/userStore'
import {
  PageMember,
  getMemberList,
  deletePageMember,
} from '@/services/api/pageMember'
import MemberSetting from '@/layout/Menu/Member/MemberSetting'
import UploadImages from '@/components/UploadImages'

const Config = memo(() => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<'detail' | 'edit' | 'create'>('detail')
  const [ownerId, setOwnerId] = useState(0)
  const userId = useUserInfoStore().userId

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

  // 属性设置：默认只读，编辑模式下可输入
  const props: {
    disabled: boolean
    variant: 'outlined' | 'borderless'
  } = {
    disabled: type === 'detail',
    variant: type === 'detail' ? 'borderless' : 'outlined',
  }

  return (
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
        logo: `${import.meta.env.VITE_CDN_URL}/mars-logo.png`,
      }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      size="middle"
      onFinish={handleSubmit}
    >
      <Form.Item label="项目ID" name={'id'} hidden>
        <Input />
      </Form.Item>
      <h3>项目基础配置</h3>
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
      <h3>系统配置</h3>
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
      <h3>权限配置</h3>
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
