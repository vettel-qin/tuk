import { ColorPicker } from 'antd'
const ColorPickerCmp = (props: any) => {
  console.log(props, 'rrrrr')

  const handleChange = (color: any) => {
    props.onChange(color.toHexString())
  }
  const handleClear = () => {
    props.onChange('')
  }
  return <ColorPicker {...props} format="hex" showText allowClear value={props.value} onChange={handleChange} onClear={handleClear} />
}

export default ColorPickerCmp
