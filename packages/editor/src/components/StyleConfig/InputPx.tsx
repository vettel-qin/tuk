import { InputNumber, Select } from 'antd'
import { useEffect, useState } from 'react'

const { Option } = Select
const InputPx = ({ value, onChange, ...props }: any) => {
  const [num, setNum] = useState(value)
  const [unit, setUnit] = useState('px')

  useEffect(() => {
    const val = value?.toString()
    const num = val?.replace(/(px|%|vw|vh|em|rem|auto)/, '')
    if (num) setNum(num)
    const reg = new RegExp('(px|%|vw|vh|em|rem|auto)')
    const unit = val?.match(reg)
    if (unit) setUnit(unit[0])
  }, [value])

  // 输入框改变
  const handleChange = (value: null | number | string) => {
    if (value || value === 0) {
      setNum(value)
      onChange(unit === 'auto' ? unit : value + unit)
    } else {
      setNum(null)
      onChange('auto')
    }
  }

  // 下拉框改变
  const handleSelect = (value: string) => {
    setUnit(value)

    console.log(num, 'num')

    if (num != null && num !== '') onChange(num + value)
    if (value === 'auto') onChange(value)
  }

  const selectAfter = (
    <Select defaultValue="px" value={unit} onChange={handleSelect} size="small" style={{ width: 60 }}>
      <Option value="px">px</Option>
      <Option value="%">%</Option>
      <Option value="vw">vw</Option>
      <Option value="vh">vh</Option>
      <Option value="em">em</Option>
      <Option value="rem">rem</Option>
      <Option value="auto">auto</Option>
    </Select>
  )

  return <InputNumber placeholder="输入尺寸：10" {...props} addonAfter={selectAfter} controls={false} onChange={handleChange} value={num} style={{ width: '100%' }} />
}

export default InputPx
