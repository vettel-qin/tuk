import request from '../request'
import {
  ProjectListParams,
  ProjectListResponse,
  ProjectCreateParams,
  ProjectUpdateParams,
} from '@/types/projects'

// 获取项目列表
export const getProjectList = (
  params: ProjectListParams,
): Promise<ProjectListResponse> => {
  return request.get('/project/category', params, { showLoading: false })
}

// 新增项目
export const addProject = (params: ProjectCreateParams): Promise<any> => {
  return request.post('/project/create', params)
}

// 更新项目
export function updateProject(params: ProjectUpdateParams): Promise<any> {
  return request.post('/project/update', params)
}
