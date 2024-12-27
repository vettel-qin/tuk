import request from '../request'
import { ProjectListParams, ProjectListResponse } from '@/types/projects'

// 获取项目列表
export const getProjectList = (
  params: ProjectListParams,
): Promise<ProjectListResponse> => {
  return request.get('/project/category', params, { showLoading: false })
}
