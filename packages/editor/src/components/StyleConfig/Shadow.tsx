import { Flex, Form, InputNumber, Radio } from 'antd'
import { useState } from 'react'
import ColorPickerCmp from '../ColorPicker'

const Shadow = (props: any) => {
  const [type, setType] = useState('none')
  const [color, setColor] = useState('#000000')
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [blur, setBlur] = useState(0)
  const [spread, setSpread] = useState(0)

  useState(() => {
    if (props.value === 'none') return

    const list = props.value?.replace(/px/g, '').split(' ')

    if (list?.length > 0) {
      setColor(list[0] || '#000000')
      setX(list[1] || 0)
      setY(list[2] || 0)
      setBlur(list[3] || 0)
      setSpread(list[4] || 0)
      setType(list[5] || 'none')
    }
  }, [])

  const handleChangeType = (value: string) => {
    setType(value)

    if (value === 'none') {
      props.onChange && props.onChange('none')
    } else {
      props.onChange(`${color} ${x}px ${y}px ${blur}px ${spread}px ${value}`)
    }
  }

  // 颜色
  const handleChangeColor = (value: string) => {
    setColor(value)
    props.onChange && props.onChange(`${value} ${x}px ${y}px ${blur}px ${spread}px ${type}`)
  }

  // 设置阴影值
  const handleChange = (condition: string, val: number | null) => {
    if (condition === 'x') {
      if (!val) val = 0
      setX(val)
      props.onChange && props.onChange(`${color} ${val}px ${y}px ${blur}px ${spread}px ${type}`)
    } else if (condition === 'y') {
      if (!val) val = 0
      setY(val)
      props.onChange && props.onChange(`${color} ${x}px ${val}px ${blur}px ${spread}px ${type}`)
    } else if (condition === 'blur') {
      if (!val) val = 0
      setBlur(val)
      props.onChange && props.onChange(`${color} ${x}px ${y}px ${val}px ${spread}px ${type}`)
    } else if (condition === 'spread') {
      if (!val) val = 0
      setSpread(val)
      props.onChange && props.onChange(`${color} ${x}px ${y}px ${blur}px ${val}px ${type}`)
    }
  }

  return (
    <>
      <Radio.Group buttonStyle="solid" optionType="button" value={type} onChange={(e) => handleChangeType(e.target.value)}>
        <Radio value="none">无</Radio>
        <Radio value="">外阴影</Radio>
        <Radio value="Inset">内阴影</Radio>
      </Radio.Group>

      {/* 当选择无的时候，不显示阴影颜色配置 */}
      {type === 'none' ? null : (
        <>
          <Form.Item label="颜色" style={{ marginBlock: 10 }}>
            <ColorPickerCmp showText allowClear value={color} onChange={(val: string) => handleChangeColor(val)} />
          </Form.Item>
          <Flex gap={10}>
            <Form.Item label="X轴">
              <InputNumber value={x} onChange={(num) => handleChange('x', num)} style={{ width: '100%' }} controls={false} />
            </Form.Item>
            <Form.Item label="Y轴">
              <InputNumber value={y} onChange={(num) => handleChange('y', num)} style={{ width: '100%' }} controls={false} />
            </Form.Item>
          </Flex>
          <Flex gap={10}>
            <Form.Item label="模糊">
              <InputNumber value={blur} onChange={(num) => handleChange('blur', num)} style={{ width: '100%' }} controls={false} />
            </Form.Item>
            <Form.Item label="扩展">
              <InputNumber value={spread} onChange={(num) => handleChange('spread', num)} style={{ width: '100%' }} controls={false} />
            </Form.Item>
          </Flex>
        </>
      )}
    </>
  )
}

export default Shadow
