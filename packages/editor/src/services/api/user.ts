import request from '../request'
import { LoginFormValues, LoginResponse } from '@/types/user'
// 用户登录

export const login = async <T extends LoginFormValues>(
  params: T,
): Promise<LoginResponse> => {
  return request.post('/login', params)
}

// 获取用户信息
export const getUserInfo = async () => {
  return request.get('/user/info')
}

// 搜索用户
export const searchUser = async (keyword: string) => {
  return request.get('/user/search', { keyword })
}
