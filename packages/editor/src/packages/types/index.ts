/**
 * 可拖拽的目标组件
 * @param icon 组件图片
 * @param name 组件中文名称
 * @param type 组件类型
 * @returns 拖拽对象
 */
export interface IDragTarget {
  icon?: React.ReactNode | string
  name: string
  type: string
}

// 面板配置表单类型
export enum FormType {
  Title = 'Title',
  ColorPicker = 'ColorPicker',
  Collapse = 'Collapse',
  Panel = 'Panel',
  Input = 'Input',
  InputPx = 'InputPx',
  TextArea = 'TextArea',
  InputSelect = 'InputSelect',
  Switch = 'Switch',
  InputNumber = 'InputNumber',
  Select = 'Select',
  FormList = 'FormList',
  Button = 'Button',
  Card = 'Card',
  Upload = 'Upload',
  Radio = 'Radio',
  RadioGroup = 'RadioGroup',
  MonacoEditor = 'MonacoEditor',
  DatePicker = 'DatePicker',
  function = 'function',
  Slider = 'Slider',
  Variable = 'Variable',
  Icons = 'Icons',
}

/**
 * 设置器中渲染的组件类型
 */
export interface SchemaType {
  // 组件类型
  type: FormType
  // 组件Key
  key: string
  // 组件FormItem样式
  style?: React.CSSProperties // 如果设置，则显示为FormItem
  // 组件FormItem文本
  label?: string // 如果设置，则显示为FormItem
  // 组件form对象
  name?: (string | number)[]
  // tooltips
  tooltip?: string // 如果设置，则显示为Tooltip
  // 是否显示弹窗
  popover?: {
    title: string // 弹窗标题
    content: string | React.ReactNode // 弹窗内容
    placement: 'top' | 'left' | 'right' | 'bottom' // 弹窗位置
  }
  // link
  link?: {
    url: string // 链接地址
    label: string // 链接文本
  }
  // Switch节点值
  valuePropName?: string // 如果设置，则显示为Switch
  // 表单验证规则
  rules?: any
  // 表单属性，非FormItem属性
  props?: any
  // 子节点
  children?: SchemaType[]
  // 渲染函数
  render?: (props?: any) => React.ReactNode
}
