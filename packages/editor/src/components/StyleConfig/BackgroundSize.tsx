import { Flex, Select } from 'antd'
import { memo, useEffect, useState } from 'react'
import InputPx from './InputPx'

interface BackgroundSizeProps {
  value?: string
  onChange?: (val: string) => void
}

const BackgroundSize = (props: BackgroundSizeProps) => {
  const [type, setType] = useState('auto')
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (props?.value === 'contain' || props?.value === 'cover') {
      setVisible(false)
      setValue('')
      setType(props?.value)
    } else {
      setVisible(true)
      setValue(props?.value)
      setType('auto')
    }
  }, [])

  const handleChange = (val: string) => {
    if (val === 'auto') {
      setVisible(true)
    } else {
      setVisible(false)
      setValue('')
    }

    setType(val)
    props.onChange(val)
  }

  const handleInput = (val: string) => {
    setValue(val)
    props?.onChange && props.onChange(val)
  }

  return (
    <Flex gap={3}>
      <Select
        placeholder="请选择"
        value={type}
        onChange={handleChange}
        options={[
          { label: '默认', value: 'auto' },
          { label: '等比填充', value: 'contain' },
          { label: '等比覆盖', value: 'cover' },
        ]}
      ></Select>
      {visible && <InputPx value={value} onChange={(val: string) => handleInput(val)} placeholder="大小" />}
    </Flex>
  )
}

export default memo(BackgroundSize)
