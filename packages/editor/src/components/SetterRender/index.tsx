/**
 * 右侧属性设置器
 * 根据JSON数据生成属性配置
 */

import { SchemaType } from '@/packages/types'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Form, Popover, Tooltip } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { memo } from 'react'
import ColorPicker from '@/components/ColorPicker'

// 如果没有设置label，则独占一行
const formLayoutFull = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
}

interface IAttrs {
  attrs: SchemaType[]
  form: FormInstance
}

const SetterRender = memo(({ attrs, form }: IAttrs) => {
  if (!attrs || !attrs.length) return <></>
  // 遍历attrs，生成表单
  return (
    <>
      {attrs.map((item: SchemaType, index: number) => {
        if (!item.label) return <></>

        const key = item.key || item.name?.toString() || item.label?.toString() + index.toString()

        let FormControl = <></>

        if (item.type === 'Title') {
          if (item.popover) {
            return (
              <Popover content={item.popover.content} title={item.popover?.title} placement={item.popover?.placement || 'left'} key={key}>
                <h2 className="color-[var(--tuk-theme-text-color)] mb-2.5 border-y border-[var(--tuk-theme-border-color)] bg-[var(--tuk-theme-bg-color)] px-2.5 py-0 text-sm font-bold leading-8">
                  <span className="mr-2.5">{item.label}</span>
                  <QuestionCircleOutlined />
                </h2>
              </Popover>
            )
          }

          return (
            <h2 key={key} className="color-[var(--tuk-theme-text-color)] mb-2.5 border-y border-[var(--tuk-theme-border-color)] bg-[var(--tuk-theme-bg-color)] px-2.5 py-0 text-sm font-bold leading-8">
              <span className="mr-2.5">{item.label}</span>
              {/* 如果设置了tooltip，则显示为Tooltip */}
              {item.tooltip && (
                <Tooltip title={item.tooltip}>
                  <QuestionCircleOutlined />
                </Tooltip>
              )}
              {/* 如果设置了跳过链接，则显示为跳过链接   */}
              {item.link && (
                <a href={item.link.url} target="_blank" className="text-xs">
                  {item.link.label}
                </a>
              )}
            </h2>
          )
        } else if (item.type === 'ColorPicker') {
          console.log(item, 'item')

          FormControl = <ColorPicker {...item.props} format="hex" />
        }

        return (
          <Form.Item label={item.label} name={item.name} key={key} tooltip={item.tooltip} {...(item.label ? null : formLayoutFull)}>
            {FormControl}
          </Form.Item>
        )
      })}
    </>
  )
})

export default SetterRender
