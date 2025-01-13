/*
 * @Description: 右侧配置面板
 *
 */

import { usePageInfoStore } from '@/stores/usePageStore'
import { useDebounceEffect, useDebounceFn } from 'ahooks'
import { Form, Tabs, ConfigProvider, Flex, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { lazy, memo, Suspense, useEffect, useRef, useState } from 'react'
import { CheckOutlined, CopyOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import SpinLoading from '@/components/SpinLoading'
import SetterRender from '@/components/SetterRender'
import { SchemaType } from '@/packages/types'
import { getComponent } from '@/packages'
import defaultsDeep from 'lodash-es/defaultsDeep'

// 样式配置
const StyleConfig = lazy(() => import('@/components/StyleConfig'))

const ConfigPanel = memo(() => {
  const [form] = useForm()
  const [clientSize, setClientSize] = useState({ width: 0, height: 0 })
  const [isCopy, setIsCopy] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [ComponentConfig, setComponentConfig] = useState<SchemaType[]>([])

  const { selectedElement, page } = usePageInfoStore()
  const { name: pageName } = page
  const pageProps = page.pageData.config.props

  /**
   * 监听选中的元素
   */
  useDebounceEffect(
    () => {
      form.resetFields()
      if (selectedElement) {
        form.setFieldsValue({ id: selectedElement.id })
        // 获取组件尺寸
        const element = document.querySelector(`[data-id="${selectedElement?.id}"]`)
        if (element) {
          const { width, height } = element.getBoundingClientRect()
          setClientSize({ width, height })
        }
      } else {
        // 获取页面配置
        getComponent('PageConfig').then((res: any) => {
          console.log(res, 'res')

          const item = res.default || []
          setComponentConfig(item)

          form.setFieldsValue({ pageName, ...defaultsDeep({ ...pageProps }, item.config.props) }) // 设置表单值
        })
      }
    },
    [selectedElement?.id],
    { wait: 300 },
  )

  const { run } = useDebounceFn(
    () => {
      handleValueChange(form.getFieldsValue())
    },
    { wait: 300 },
  )

  // 接收form的值
  const handleValueChange = (value: any) => {
    console.log(value)
  }

  // 复制组件
  const handleCopy = () => {
    copy(selectedElement?.id || pageName)
    message.info('复制成功')
    setIsCopy(true)
    timer.current = setTimeout(() => {
      setIsCopy(false)
    }, 3000)
  }

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  }

  const items = [
    {
      key: 'props',
      label: '属性',
      children: (
        <Form form={form} style={{ paddingBottom: 20 }} layout="horizontal" labelAlign="right" {...formLayout} onValuesChange={run}>
          <div className="relative top-[-8px] ms-auto flex w-[90%] items-center justify-center text-center leading-8 text-[#5b5b5c]">
            {selectedElement?.id ? <span>组件ID: {selectedElement.id}</span> : null}
            {selectedElement?.id && isCopy ? <CheckOutlined className="ml-1.5" /> : selectedElement?.id && <CopyOutlined className="ml-1.5" onClick={handleCopy} />}
          </div>
          <Flex justify="space-between" gap={20} className="relative top-[-8px] ms-auto flex w-[90%] items-center justify-center text-center leading-8 text-[#5b5b5c]">
            <span>宽度：{clientSize.width?.toFixed(0)}</span>
            <span>高度：{clientSize.height?.toFixed(0)}</span>
          </Flex>
          <Suspense fallback={<SpinLoading />}>
            <SetterRender attrs={ComponentConfig?.attrs || []} form={form} />
          </Suspense>
        </Form>
      ),
    },
    {
      key: 'style',
      label: '样式',
      children: (
        <Suspense fallback={<SpinLoading />}>
          <StyleConfig />
        </Suspense>
      ),
    },
    {
      key: 'event',
      label: '事件',
      children: <div>事件</div>,
    },
    {
      key: 'api',
      label: '数据',
      children: <div>数据</div>,
    },
  ]

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [])
  return (
    <ConfigProvider
      theme={{
        token: { fontSize: 12 },
        components: {
          Tabs: { titleFontSize: 14 },
          Form: { itemMarginBottom: 15 },
          InputNumber: { paddingInline: 8 },
        },
      }}
    >
      <Tabs items={items} centered defaultActiveKey="props" className="h-[calc(100vh-64px)] overflow-auto border-l border-[var(--tuk-theme-border-color)]" />
    </ConfigProvider>
  )
})

export default ConfigPanel
