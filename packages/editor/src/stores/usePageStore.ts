import { create } from 'zustand'
import { produce } from 'immer'

export interface PageState {
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
}

export interface PageAction {
  savePageInfo: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

const initialState: PageState = {
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
}

export const usePageStore = create<PageState & PageAction>((set) => ({
  ...initialState,
  savePageInfo: () => {
    // 实现保存页面信息的逻辑
    console.log('Saving page info...')
  },
  // 切换主题
  setTheme: (theme: 'light' | 'dark') => {
    set(
      produce((state) => {
        state.theme = theme
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
