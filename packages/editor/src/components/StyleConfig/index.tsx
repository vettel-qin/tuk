import { Form, Input, Slider } from 'antd'
import TitleStyle from './TitleStyle'
import InputPx from './InputPx'
import FlexStyle from './FlexStyle'
import { usePageStore } from '@/stores/usePageStore'
import { useEffect } from 'react'

const StyleConfig = () => {
  const [form] = Form.useForm()
  const { pageData, selectedElement } = usePageStore()

  useEffect(() => {
    form.resetFields()

    if (selectedElement) {
      form.setFieldsValue('scopeStyle', pageData.config.scopeStyle)
    } else {
      // 填充组件样式
      const config = pageData.elementsMap[selectedElement.id]?.config || {}

      form.setFieldsValue('scopeStyle', config.scopeStyle || config.style)
    }
  }, [selectedElement])

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 },
  }

  return (
    <Form layout="horizontal" labelAlign="right" {...formLayout} className="pb-2.5">
      <TitleStyle>基础</TitleStyle>
      <Form.Item label="宽度" name={['scopeStyle', 'width']}>
        <InputPx />
      </Form.Item>
      <Form.Item label="高度" name={['scopeStyle', 'height']}>
        <InputPx />
      </Form.Item>
      <Form.Item label="外边距" name={['scopeStyle', 'margin']}>
        <Input placeholder="外边距：10px" />
      </Form.Item>
      <Form.Item label="内边距" name={['scopeStyle', 'padding']}>
        <Input placeholder="内边距：10px" />
      </Form.Item>
      <Form.Item label="透明度" name={['scopeStyle', 'opacity']} key="opacity">
        <Slider min={0} max={1} step={0.1} />
      </Form.Item>
      <TitleStyle>布局</TitleStyle>
      <FlexStyle form={form} />
    </Form>
  )
}

export default StyleConfig
