import request from '../request'
import {
  ProjectListParams,
  ProjectListResponse,
  ProjectCreateParams,
  ProjectUpdateParams,
  ProjectDetail,
} from '@/types/projects'

// 获取项目列表
export const getProjectList = (
  params: ProjectListParams,
): Promise<ProjectListResponse> => {
  return request.get('/projects/list', params, { showLoading: false })
}

// 新增项目
export const addProject = (params: ProjectCreateParams): Promise<any> => {
  return request.post('/project/create', params)
}

// 更新项目
export function updateProject(params: ProjectUpdateParams): Promise<any> {
  return request.post('/project/update', params)
}

// 检查权限
export function checkAuth(params: { id: number }) {
  return request.post('/project/checkAuth', params)
}

// 删除项目
export function delProject(params: { id: number; type?: string }) {
  return request.post('/project/delete', params)
}

// 获取项目详情
export function getProjectDetail(id: number): Promise<ProjectDetail> {
  return request.get(`/project/detail/${id}`, {})
}
