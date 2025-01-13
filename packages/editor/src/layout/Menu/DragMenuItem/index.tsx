import { useState } from 'react'
import { createId } from '@/utils/utils'
import { usePageActionStore } from '@/stores/usePageStore'
import { getComponent } from '@/packages'
import { IDragTarget } from '@/packages/types'
import { useDrag } from 'react-dnd'

const DragMenuItem = (props: any) => {
  console.log(props, 'props')
  // 生成组件ID
  const [id, setId] = useState(createId(props.type))
  const { addElement } = usePageActionStore()

  const handleClick = async (item) => {
    // 生成默认配置
    const { config, events, methods = [], elements = [] } = (await getComponent(item.type + 'Config'))?.default || {}
    const newId = createId(item.type)

    console.log(elements, 'elements')

    addElement({
      type: item.type,
      name: item.name,
      id: newId,
      elements: [],
      config,
      events,
      methods,
    })
    // if (!checkComponentType(item.type, selectedElement?.id, selectedElement?.type, elementsMap)) {
    //   message.info('请把表单项放在Form容器内')
    //   return
    // }
    // const childElement =
    //   elements.map(async (child: IDragTarget & { id: string }) => {
    //     const { config, events, methods = [] }: any = (await getComponent(child.type + 'Config'))?.default || {}
    //     return {
    //       id: child.id || createId(child.type),
    //       name: child.name,
    //       type: child.type,
    //       parentId: newId,
    //       config,
    //       events,
    //       methods,
    //     }
    //   }) || []
    // Promise.all(childElement).then((res) => {
    //   addElement({
    //     type: item.type,
    //     name: item.name,
    //     id: newId,
    //     elements: res,
    //     config,
    //     events,
    //     methods,
    //   })

    // if (selectedElement) {
    //   addChildElements({
    //     type: item.type,
    //     name: item.name,
    //     elements: res,
    //     parentId: selectedElement.id,
    //     id: newId,
    //     config,
    //     events,
    //     methods,
    //   })
    // } else {
    //   addElement({
    //     type: item.type,
    //     name: item.name,
    //     id: newId,
    //     elements: res,
    //     config,
    //     events,
    //     methods,
    //   })
    // }
    //})
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'MENU_ITEM',
    item: {
      id,
      type: props.type,
      name: props.name,
    },
    end: () => {
      setId(createId(props.type))
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  return (
    <div>
      <div
        ref={drag}
        className="user-select-none flex cursor-move flex-col items-center rounded-lg border border-transparent px-1 py-1 transition-all duration-300 hover:scale-105 hover:transform"
        style={{ cursor: 'pointer' }}
        onClick={() => handleClick(props)}
      >
        <div className="mb-2 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-[#f0f0f1] bg-white shadow-sm transition-all duration-300">
          {typeof props.icon === 'string' ? <img src={props.icon} alt={props.name} className="h-10 w-10" /> : props.icon}
        </div>
        <div className="-webkit-box-align-center -webkit-box-pack-center mt-2 flex items-center text-xs">{props.name}</div>
      </div>
    </div>
  )
}

export default DragMenuItem
