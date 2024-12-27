import request from '../request'
import { ProjectParams, ProjectListResponse } from '@/types/projects'

// 获取项目列表
export const getProjectList = async (
  params: ProjectParams,
): Promise<ProjectListResponse> => {
  return request.get('/page/list', params, { showLoading: false })
}
