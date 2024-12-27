import axios, { AxiosError } from 'axios'
import router from '@/router'
import { message } from '@/utils/AntdGlobal'
import { storage } from '@/utils/storage'

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuthRefresh?: boolean
    showError?: boolean
  }
}

interface ResponseData {
  code: number
  data: any
  message: string
}

const ErrorMessage = '网络异常，请稍后再试'

/**
 * 创建axios实例
 */
const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
  timeoutErrorMessage: '请求超时', // 超时提示
  withCredentials: true, // 允许携带cookie
  headers: {}, // 默认请求头
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    config.baseURL = import.meta.env.VITE_BASE_API
    // 添加token
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.url === '/upload/files') {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  async (response) => {
    const res: ResponseData = await response.data
    if (!res) {
      message.error(ErrorMessage)
      return Promise.reject(ErrorMessage)
    }
    if (res.code === 0) {
      return res.data
    }

    if (res.code === 401 || res.code === 10018) {
      message.error('登录已过期，请重新登录')
      setTimeout(() => {
        window.location.replace(`/login?callback=${window.location.href}`)
        return null
      }, 1500)
      return Promise.reject(res.message)
    } else if (res.code !== 0) {
      response.config.showError === false ? null : message.error(res.message)
      return Promise.reject(res)
    }
    return res // 返回数据
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 403) {
      router.navigate('/403')
    } else {
      message.error(error.message || ErrorMessage)
    }
    return Promise.reject(error.message)
  },
)

// 导出调用函数
export default {
  get<R>(url: string, params = {}, options = {}): Promise<R> {
    return instance.get(url, { params, ...options })
  },
  post<R>(url: string, data = {}, options = {}): Promise<R> {
    return instance.post(url, data, options)
  },
}
