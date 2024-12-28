import request from '@/services/request'

export interface AddParams {
  type: 1 | 2
  pageId: number
  role: number
  userName: string
}

export interface DelParams {
  id: number
}
export interface PageMember extends AddParams {
  id: number
  userId: number
}

export interface PageItem {
  id: number
  name: string
  remark: string
  projectId: number
}

/**
 * 页面和项目成员接口定义
 */
export function getMemberList(params: { pageId: number }) {
  return request.post('/page/role/list', params)
}
export function addPageMember(params: AddParams) {
  return request.post('/page/role/add', params)
}
export function deletePageMember(params: DelParams) {
  return request.post('/page/role/delete', params)
}
