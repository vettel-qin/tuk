// 项目列表接口
export interface ProjectParams {
  keyword?: string
  pageNum: number
  pageSize?: number
  type?: number
}

// 定义项目列表响应的接口
export interface ProjectListResponse {
  total?: number
  list?: any[]
}

// 项目列表项接口
export interface ProjectItem {
  id: number
  name: string
  user_name: string
  user_id: number
  remark: string
  updated_at: string
  created_at: string
  stg_publish_id: number
  pre_publish_id: number
  prd_publish_id: number
  stg_state: number
  pre_state: number
  prd_state: number
  members: Array<{
    id: number
    role: 1 | 2
    user_id: string
    user_name: string
  }>
  preview_img: string
}
