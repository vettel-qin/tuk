import { Input, Modal, Form, Button } from 'antd'
import { useImperativeHandle, useState, forwardRef, memo } from 'react'
import UploadImages from '@/components/UploadImages'
import { message } from '@/utils/AntdGlobal'
import TextArea from 'antd/es/input/TextArea'
import { addProject } from '@/services/api/projects'

/**
 * 创建项目
 */
const CreateProject = (props: { createRef: any; update?: () => void }) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  // 暴露方法
  useImperativeHandle(props.createRef, () => ({
    open() {
      form.resetFields()
      setVisible(true)
    },
  }))

  // 提交
  const handleOk = async () => {
    try {
      await form.validateFields()
      const values = form.getFieldsValue()
      setLoading(true)
      await addProject({ ...values })
      message.success('项目初始化成功')
      props.update?.()
      setLoading(false)
      setVisible(false)
    } catch (error) {
      setLoading(false)
    }
  }

  // 关闭
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  return (
    <Modal
      title="初始项目信息"
      open={visible}
      confirmLoading={loading}
      onCancel={handleCancel}
      width={500}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ logo: '' }}
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入页面名称' }]}
        >
          <Input placeholder="请输入项目名称" maxLength={15} showCount />
        </Form.Item>
        <Form.Item
          label="描述"
          name="remark"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            placeholder="请输入描述"
            maxLength={100}
            showCount
          />
        </Form.Item>
        <Form.Item
          label="图标"
          name="logo"
          rules={[{ required: true, message: '请上传项目Logo' }]}
        >
          <UploadImages />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" onClick={handleOk} loading={loading}>
            快速初始化
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(forwardRef(CreateProject))
