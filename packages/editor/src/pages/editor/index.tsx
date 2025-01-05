import { useDrop } from 'react-dnd'
import React, { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Page from '@/packages/Page/Page'
import { getComponent } from '@/packages'
import { usePageActionStore, usePageInfoStore } from '@/stores/usePageStore'
import PageConfig from '@/packages/Page/Schema'
import styles from './index.module.less'

const Editor = () => {
  // const [id, setId] = useState(createId(props.type))
  const [canvasWidth, setCanvasWidth] = useState('auto')
  const { addElement, savePageInfo } = usePageActionStore()
  const { state } = usePageInfoStore()
  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    let pageData = {}

    pageData = { config: PageConfig.config }

    console.log(pageData, 'pageData')

    savePageInfo({ ...state, pageData })
  }, [id])

  const [{ isOver }, drop] = useDrop({
    accept: 'MENU_ITEM',
    async drop(item: any, monitor: any) {
      console.log(item, monitor) // 处理放置逻辑
      // 此处必须检测该组件是否已经被放入完成，如果已经放置到其它容器中，直接返回。
      if (monitor.didDrop()) return
      // 生成默认配置
      const { config, events, methods = [], elements = [] }: any = (await getComponent(item.type + 'Config'))?.default || {}

      // const newId = createId(item.type)

      addElement({
        type: item.type,
        name: item.name,
        id: item.id,
        elements: [],
        config,
        events,
        methods,
      })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  // 自适应时，需要计算画布宽度
  const editorWidth = useMemo(() => {
    if (canvasWidth !== 'auto') return ''
    const editorWidth = document.querySelector('#designer')?.getBoundingClientRect()?.width
    return `${editorWidth}px`
  }, [canvasWidth])
  return (
    <div ref={drop} className={`${styles.designer} relative overflow-auto`}>
      <div
        id="designer"
        className={styles['designer-editor']}
        // style={{ height: mode === 'preview' ? 'calc(100vh - 64px)' : 'calc(100vh - 104px)' }}
      >
        <div
          id="editor"
          className="relative mx-auto my-0 p-5"
          style={
            // mode === 'preview'
            //   ? { height: 'calc(100vh - 64px)', overflow: 'auto', padding: 0 } :
            { width: canvasWidth === 'auto' ? editorWidth : canvasWidth }
          }
          // onMouseOver={handleRunOver}
        >
          {isOver ? '拖动中' : '拖动'}
          <React.Suspense fallback={<div>Loading...</div>}>{<Page />}</React.Suspense>
        </div>
      </div>
    </div>
  )
}

export default Editor
