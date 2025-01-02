import IconFlex from './icons/IconFlex'
import IconCard from './icons/IconCard'
import IconForm from './icons/IconForm'
import IconDiv from './icons/IconDiv'
import IconGrid from './icons/IconGrid'

const components = [
  {
    type: 'Page',
    title: '页面组件',
    hidden: true,
    data: [],
  },
  {
    type: 'Container',
    title: '容器组件',
    data: [
      {
        icon: <IconFlex />,
        name: 'Flex容器',
        type: 'Flex',
      },
      {
        icon: <IconCard />,
        name: 'Card容器',
        type: 'Card',
      },
      {
        icon: <IconForm />,
        name: 'Form容器',
        type: 'Form',
      },
      {
        icon: <IconDiv />,
        name: 'Div容器',
        type: 'Div',
      },
      {
        icon: <IconGrid />,
        name: '网格容器',
        type: 'Grid',
      },
    ],
  },
]

export default components