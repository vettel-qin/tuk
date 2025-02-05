import { Flex, Form, Input, InputNumber, Radio, Select, Slider, Tooltip } from 'antd'
import TitleStyle from './TitleStyle'
import InputPx from './InputPx'
import FlexStyle from './FlexStyle'
import { usePageInfoStore } from '@/stores/usePageStore'
import { useEffect } from 'react'
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, CaretDownOutlined } from '@ant-design/icons'
import ColorPickerCmp from '../ColorPicker'
import BackgroundImage from './BackgroundImage'
import BackgroundSize from './BackgroundSize'
import Shadow from './Shadow'

const StyleConfig = () => {
  const [form] = Form.useForm()
  const { page, selectedElement } = usePageInfoStore()
  const pageData = page.pageData

  useEffect(() => {
    form.resetFields()

    if (!selectedElement) {
      form.setFieldsValue({ scopeStyle: page.pageData.config.scopeStyle })
    } else {
      // 填充组件样式
      const config = pageData.elementsMap[selectedElement.id]?.config || {}

      form.setFieldsValue({ scopeStyle: config.scopeStyle || config.style })
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
      <TitleStyle>文字</TitleStyle>
      <Form.Item label="字体大小" name={['scopeStyle', 'fontSize']}>
        <InputPx placeholder="字体大小：14" />
      </Form.Item>
      <Form.Item label="字体颜色" name={['scopeStyle', 'color']}>
        <ColorPickerCmp showText allowClear />
      </Form.Item>
      <Form.Item label="行高" name={['scopeStyle', 'lineHeight']}>
        <InputPx placeholder="行高：1.5" />
      </Form.Item>
      <Form.Item label="字体粗细" name={['scopeStyle', 'fontWeight']}>
        <Select
          key={'fontWeight'}
          placeholder="字体粗细: 400"
          options={[
            {
              value: 100,
              label: '100 Thin',
            },
            {
              value: 200,
              label: '200 Extra Light',
            },
            {
              value: 300,
              label: '300 Light',
            },

            {
              value: 400,
              label: '400 Normal',
            },
            {
              value: 500,
              label: '500 Medium',
            },
            {
              value: 600,
              label: '600 Semi Bold',
            },
            {
              value: 700,
              label: '700 Bold',
            },
            {
              value: 800,
              label: '800 Extra Bold',
            },
            {
              value: 900,
              label: '900 Black Bold',
            },
          ]}
          suffixIcon={<CaretDownOutlined />}
        />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'textAlign']} label="对齐方式">
        <Radio.Group buttonStyle="solid" optionType="button">
          <Tooltip title="左对齐">
            <Radio value={'left'}>
              <AlignLeftOutlined />
            </Radio>
          </Tooltip>
          <Tooltip title="居中对齐">
            <Radio value={'center'}>
              <AlignCenterOutlined />
            </Radio>
          </Tooltip>
          <Tooltip title="右对齐">
            <Radio value={'right'}>
              <AlignRightOutlined />
            </Radio>
          </Tooltip>
        </Radio.Group>
      </Form.Item>
      <TitleStyle>背景</TitleStyle>
      <Form.Item label="背景颜色" name={['scopeStyle', 'backgroundColor']}>
        <ColorPickerCmp />
      </Form.Item>
      <Form.Item label="图片" name={['scopeStyle', 'backgroundImage']} tooltip="支持渐变色，图片使用时，直接输入远程地址即可（http(s)://xxx.png）">
        <BackgroundImage />
      </Form.Item>
      <Form.Item label="尺寸" name={['scopeStyle', 'backgroundSize']}>
        <BackgroundSize />
      </Form.Item>

      <Form.Item label="平铺" name={['scopeStyle', 'backgroundRepeat']}>
        <Select
          options={[
            { label: '平铺', value: 'repeat' },
            { label: '不平铺', value: 'no-repeat' },
            { label: '水平平铺', value: 'repeat-x' },
            { label: '垂直平铺', value: 'repeat-y' },
          ]}
          suffixIcon={<CaretDownOutlined />}
        />
      </Form.Item>

      <Form.Item label="位置" name={['scopeStyle', 'backgroundPosition']}>
        <Select
          options={[
            { label: 'top', value: 'top' },
            { label: 'bottom', value: 'bottom' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
            { label: 'center', value: 'center' },
          ]}
          suffixIcon={<CaretDownOutlined />}
        />
      </Form.Item>

      <TitleStyle>定位</TitleStyle>

      <Form.Item label="定位" name={['scopeStyle', 'position']} key={'position'}>
        <Select
          placeholder="请选择"
          options={[
            { label: 'static', value: 'static' },
            { label: 'relative', value: 'relative' },
            { label: 'absolute', value: 'absolute' },
            { label: 'fixed', value: 'fixed' },
            { label: 'sticky', value: 'sticky' },
          ]}
          suffixIcon={<CaretDownOutlined />}
        ></Select>
      </Form.Item>

      <Form.Item label="zIndex" name={['scopeStyle', 'zIndex']} key={'zIndex'}>
        <InputNumber label="层级" />
      </Form.Item>

      {!['', undefined, 'static'].includes(form.getFieldValue(['scopeStyle', 'position'])) && (
        <Form.Item label="位置">
          <Flex gap={3}>
            <Form.Item name={['scopeStyle', 'top']} noStyle>
              <InputPx placeholder="T: 10" />
            </Form.Item>
            <Form.Item name={['scopeStyle', 'right']} noStyle>
              <InputPx placeholder="R: 10" />
            </Form.Item>
          </Flex>

          <Flex gap={3} style={{ marginTop: 10 }}>
            <Form.Item name={['scopeStyle', 'bottom']} noStyle>
              <InputPx placeholder="B: 10" />
            </Form.Item>
            <Form.Item name={['scopeStyle', 'left']} noStyle>
              <InputPx placeholder="L: 10" />
            </Form.Item>
          </Flex>
        </Form.Item>
      )}

      <Form.Item label="溢出" name={['scopeStyle', 'overflow']} key={'overflow'}>
        <Select
          placeholder={'请选择'}
          options={[
            {
              label: '默认',
              value: 'auto',
            },
            {
              label: '可见',
              value: 'visible',
            },
            {
              label: '超出隐藏',
              value: 'hidden',
            },
            {
              label: '超出滚动',
              value: 'scroll',
            },
          ]}
          suffixIcon={<CaretDownOutlined />}
        />
      </Form.Item>

      <TitleStyle>边框</TitleStyle>
      <Form.Item name={['scopeStyle', 'borderRadius']} label={'圆角'}>
        <InputPx placeholder="eg：5" />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'border']} label={'边框'}>
        <Input placeholder="eg：1px solid #fff" />
      </Form.Item>
      <Form.Item label="阴影" name={['scopeStyle', 'boxShadow']}>
        <Shadow />
      </Form.Item>
    </Form>
  )
}

export default StyleConfig
