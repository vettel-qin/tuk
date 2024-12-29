// 项目列表参数接口
export interface ProjectListParams {
  keyword?: string
  pageNum: number
  pageSize?: number
  type?: number
}

// 项目列表接口
export interface ProjectItem {
  id: number
  name: string
  remark: string
  logo: string
  user_name: string
  user_id: number
  is_edit: boolean
  updated_at: string
  created_at: string
  members?: Array<{
    id: number
    role: 1 | 2
    user_id: string
    user_name: string
  }>
}

// 定义项目列表响应的接口
export interface ProjectListResponse {
  list?: ProjectItem[]
  total?: number
}

// 创建项目参数
export interface ProjectCreateParams {
  name: string
  remark?: string
  logo: string
}

export interface ProjectUpdateParams extends ProjectCreateParams {
  id: number
}

// 定义接口
export interface ProjectDetail {
  id: number
  name: string
  remark: string
  userId: number
}
