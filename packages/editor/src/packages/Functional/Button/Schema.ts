/**
 * 组件配置和属性值
 */

export default {
  attrs: [
    {
      type: 'Title',
      label: '基础设置',
      key: 'basic',
    },
    {
      type: 'Variable',
      label: '按钮名称',
      name: ['text'],
    },
    {
      type: 'Select',
      label: '按钮类型',
      name: ['type'],
      props: {
        options: [
          { label: '默认', value: 'default' },
          { label: '主要', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
          { label: '虚线', value: 'dashed' },
          { label: '链接', value: 'link' },
        ],
      },
    },
    {
      type: 'Select',
      label: '按钮形状',
      name: ['shape'],
      props: {
        options: [
          { label: 'default', value: 'default' },
          { label: 'circle', value: 'circle' },
          { label: 'round', value: 'round' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '块状按钮',
      name: ['block'],
    },
    {
      type: 'Switch',
      label: '幽灵按钮',
      name: ['ghost'],
    },
    {
      type: 'Switch',
      label: '危险按钮',
      name: ['danger'],
    },
    {
      type: 'Variable',
      label: '是否禁用',
      name: ['disabled'],
    },
    {
      type: 'Icons',
      label: '按钮图标',
      name: ['icon'],
    },
    {
      type: 'Title',
      label: '权限验证',
      key: 'auth',
    },
    {
      type: 'Input',
      label: '权限标识',
      name: ['authCode'],
      props: {
        placeholder: '按钮权限标识',
      },
    },
    {
      type: 'Variable',
      label: '三方验证',
      name: ['authScript'],
      props: {
        placeholder: '运行脚本',
      },
    },
  ],
  config: {
    // 组件默认属性值
    props: {
      type: 'primary',
      size: 'middle',
      text: '按钮',
      shape: 'default',
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
  },
  // 组件事件
  events: [
    {
      value: 'onClick',
      name: '点击事件',
    },
  ],
  methods: [
    {
      name: 'startLoading',
      title: '开始loading',
    },
    {
      name: 'endLoading',
      title: '结束loading',
    },
  ],
}
