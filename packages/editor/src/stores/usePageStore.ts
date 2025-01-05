import { create } from 'zustand'
import { produce } from 'immer'
import { cloneDeep, merge } from 'lodash-es'

export interface PageState {
  isEdit: boolean
  page: {
    id: number
    name: string
    remark: string
    projectId: number
    isPublic: 1 | 2
    stgState: 1 | 2 | 3 | 4 // 1:未保存 2:已保存 3:已发布 4:已回滚
    preState: 1 | 2 | 3 | 4 // 1:未保存 2:已保存 3:已发布 4:已回滚
    prdState: 1 | 2 | 3 | 4 // 1:未保存 2:已保存 3:已发布 4:已回滚
    stgPublishId: number
    prePublishId: number
    prdPublishId: number
    previewImg?: string
    userId: number
    userName: string
    pageData: {
      config: {
        props: any
        style: React.CSSProperties
        scopeCss: string
        scopeStyle: React.CSSProperties
        events: any[]
        api: {
          sourceType: 'json' | 'api'
          id: string
          source: any
          sourceField: string | { type: 'variable' | 'static'; value: string }
        }
      }
      events: Array<{ name: string; value: string }>
      apis: { [key: string]: any }
      elements: any[]
      elementsMap: { [key: string]: any }
      variables: any[]
      variableData: { [key: string]: any }
      formData: { [key: string]: any }
      interceptor: {
        headers?: {
          key: string
          value: string
        }[]
        timeout: number
        timeoutErrorMessage: string
        requestInterceptor?: string
        responseInterceptor?: string
      }
    }
  }
  // 主题
  theme: 'light' | 'dark'
  selectedElement: { type: string; id: string } | undefined
}

export interface PageAction {
  savePageInfo: (payload: any) => void
  setTheme: (theme: 'light' | 'dark') => void
  addElement: (element: any) => void
  setSelectedElement: (element: { type: string; id: string } | undefined) => void
}

const initialState: PageState = {
  // 是否编辑了页面
  isEdit: false,
  page: {
    id: 0,
    name: '',
    remark: '',
    projectId: 0,
    isPublic: 2,
    userId: 0,
    userName: '',
    previewImg: '',
    stgState: 1,
    preState: 1,
    prdState: 1,
    stgPublishId: 0,
    prePublishId: 0,
    prdPublishId: 0,
    pageData: {
      config: {
        props: {},
        style: {},
        scopeCss: '',
        scopeStyle: {},
        events: [],
        api: {
          sourceType: 'json',
          id: '',
          source: {},
          sourceField: '',
        },
      },
      events: [],
      apis: {},
      elements: [],
      elementsMap: {},
      variables: [],
      variableData: {},
      formData: {},
      interceptor: {
        headers: [{ key: '', value: '' }],
        timeout: 8,
        timeoutErrorMessage: '请求超时，请稍后再试',
      },
    },
  },
  theme: 'light',
  selectedElement: undefined, // 选中的元素
}

export const usePageStore = create<PageState & PageAction>((set) => ({
  ...initialState,
  savePageInfo: (payload: any) => {
    // 实现保存页面信息的逻辑
    console.log('Saving page info...')
    set(
      produce((state) => {
        state.isEdit = true // 标记为编辑状态
        if (payload.type === 'props') {
          state.page.pageData.config.props = payload.props
        } else if (payload.type === 'style') {
          // 如果是style，则直接更新
          state.page.pageData.config.scopeCss = payload.scopeCss
          state.page.pageData.config.scopeStyle = payload.scopeStyle
          state.page.pageData.config.style = payload.style
        } else if (payload.type === 'events') {
          state.page.pageData.config.events = payload.events || []
        } else if (payload.type === 'api') {
          state.page.pageData.config.api = payload.api
        } else {
          state.isEdit = false // 标记为编辑状态
          state.page = merge({}, state.page, payload)
        }
      }),
    )
  },
  // 切换主题
  setTheme: (theme: 'light' | 'dark') => {
    set(
      produce((state) => {
        state.theme = theme
      }),
    )
  },

  // 添加组件
  addElement: (element: any) => {
    set(
      produce((state) => {
        state.isEdit = true // 标记为编辑状态
        state.page.pageData.elements.push({
          id: element.id,
          parentId: element.parentId,
          type: element.type,
          name: element.name,
          elements: element.elements?.map((item: any) => ({ id: item.id, parentId: element.id, type: item.type, name: item.name })) || [],
        })
        const childElement = cloneDeep({
          ...element,
          elements: undefined,
          remoteUrl: element.remoteUrl,
          remoteConfigUrl: element.remoteConfigUrl,
          remoteCssUrl: element.remoteCssUrl,
        })
        // if (element.config.props?.formItem) {
        //   childElement.config.props?.formItem.name = createId(element.type, 6) // 生成组件ID
        // }
        // 添加当前组件对象
        state.page.pageData.elementsMap[element.id] = childElement
        // 添加子组件对象
        element.elements?.map((item: any) => {
          state.page.pageData.elementsMap[item.id] = item
        })
      }),
    )
  },

  // 设置选中的组件
  setSelectedElement: (element: { type: string; id: string } | undefined) => {
    set(
      produce((state) => {
        state.selectedElement = element
      }),
    )
  },
}))

// export const usePageActionStore = () =>
//   usePageStore((state) => state.setPageInfo)

// export const usePageStoreReset = () => usePageStore.setState()

export const usePageInfoStore = () => usePageStore((state) => state)

export const usePageActionStore = () => usePageStore((state) => state)

export const usePageStoreReset = () =>
  usePageStore.setState({
    page: {
      id: 0,
      name: '',
      remark: '',
      projectId: 0,
      isPublic: 2,
      userId: 0,
      userName: '',
      previewImg: '',
      stgState: 1,
      preState: 1,
      prdState: 1,
      stgPublishId: 0,
      prePublishId: 0,
      prdPublishId: 0,
      pageData: {
        config: {
          props: {},
          style: {},
          scopeCss: '',
          scopeStyle: {},
          events: [],
          api: {
            sourceType: 'json',
            id: '',
            source: {},
            sourceField: '',
          },
        },
        events: [],
        apis: {},
        elements: [],
        elementsMap: {},
        variables: [],
        variableData: {},
        formData: {},
        interceptor: {
          headers: [{ key: '', value: '' }],
          timeout: 8,
          timeoutErrorMessage: '请求超时，请稍后再试',
        },
      },
    },
    theme: 'light',
  })
