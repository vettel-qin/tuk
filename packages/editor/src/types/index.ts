// 上传文件返回的数据
export interface UploadResponse {
  name: string
  url?: string
}

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
