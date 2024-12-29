// 定义登录响应的接口
export interface LoginResponse {
  token?: string
  userId: number
  userName: string
  nickName: string
  avatar: string
}

// 定义表单值的接口
export interface LoginFormValues {
  userName: string
  code?: number
  userPwd: string
}
